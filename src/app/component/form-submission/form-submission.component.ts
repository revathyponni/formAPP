import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { FormRow, FormField } from '../../models/field';
import { FormStorageService, StoredForm } from '../../services/form-storage.service';
import { CanComponentDeactivate } from '../../guards/navigation.guard';

@Component({
  selector: 'app-form-submission',
  standalone: false,
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit, CanComponentDeactivate {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formService = inject(FormService);
  private authService = inject(AuthService);
  private formStorage = inject(FormStorageService);

  form = signal<StoredForm | null>(null);
  formData = signal<Record<string, any>>({});
  isLoading = signal(true);
  isSubmitting = signal(false);
  submissionSuccess = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const formId = params.get('formId');
      if (formId) {
        this.loadForm(formId);
      } else {
        this.errorMessage.set('Form ID not provided');
        this.isLoading.set(false);
      }
    });
  }

  private loadForm(formId: string) {
    const form = this.formStorage.getForm(formId);
    if (form) {
      this.form.set(form);
      this.initializeFormData(form.rows);
      this.isLoading.set(false);
    } else {
      this.errorMessage.set('Form not found');
      this.isLoading.set(false);
    }
  }

  private initializeFormData(rows: FormRow[]) {
    const data: Record<string, any> = {};
    rows.forEach(row => {
      row.fields.forEach(field => {
        if (field.type !== 'button') {
          data[field.id] = '';
        }
      });
    });
    this.formData.set(data);
  }

  onFieldChange(fieldId: string, value: any) {
    this.formData.update(data => ({
      ...data,
      [fieldId]: value
    }));
  }

  onSubmit() {
    if (!this.form()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      this.formService.submitForm(this.formData());
      this.submissionSuccess.set(true);

      // Redirect to success page or show success message
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error) {
      this.errorMessage.set('Failed to submit form. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getFieldValue(fieldId: string): any {
    return this.formData()[fieldId] || '';
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  hasSubmitButton(rows: FormRow[]): boolean {
    return rows.some(row =>
      row.fields.some(field =>
        field.type === 'button' && field.buttonType === 'submit'
      )
    );
  }

  canDeactivate(): boolean {
    // Check if form has been submitted successfully
    if (this.submissionSuccess()) {
      return true;
    }

    // Check if form has any data entered
    const hasData = Object.values(this.formData()).some(value => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== null && value !== undefined && value !== '';
    });

    if (hasData) {
      return confirm('You have unsaved form data. Are you sure you want to leave?');
    }

    return true;
  }
}
