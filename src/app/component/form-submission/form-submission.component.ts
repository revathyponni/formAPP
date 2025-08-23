import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/navigation.guard';
import { FormRow } from '../../models/field';
import { StoredForm } from '../../models/form';
import { AuthService } from '../../services/auth.service';
import { FormStorageService } from '../../services/form-storage.service';
import { FormService } from '../../services/form.service';

/**
 * This component handles the form submission process.
 */
@Component({
  selector: 'app-form-submission',
  standalone: false,
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss'],
})
export class FormSubmissionComponent implements OnInit, CanComponentDeactivate {
  form = signal<StoredForm | null>(null);
  formData = signal<Record<string, any>>({});
  isLoading = signal(true);
  isSubmitting = signal(false);
  submissionSuccess = signal(false);
  errorMessage = signal('');

  //Injections
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formService = inject(FormService);
  private authService = inject(AuthService);
  private formStorage = inject(FormStorageService);

  /**
   * Lifecycle hook that is called when the component is initialized.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const formId = params.get('formId');
      if (formId) {
        this.loadForm(formId);
      } else {
        this.errorMessage.set('Form ID not provided');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Loads the form data for the specified form ID.
   * @param formId The ID of the form to load.
   */
  private loadForm(formId: string): void {
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

  /**
   * Initializes the form data based on the form rows.
   * @param rows The rows of the form.
   */
  private initializeFormData(rows: FormRow[]): void {
    const data: Record<string, any> = {};
    rows.forEach((row) => {
      row.fields.forEach((field) => {
        if (field.type !== 'button') {
          data[field.id] = '';
        }
      });
    });
    this.formData.set(data);
  }

  /**
   * Handles changes to form fields.
   * @param fieldId The ID of the field that changed.
   * @param value The new value of the field.
   */
  onFieldChange(fieldId: string, value: any): void {
    this.formData.update((data) => ({
      ...data,
      [fieldId]: value,
    }));
  }

  /**
   * This method is called when the form is submitted.
   */
  onSubmit(): void {
    if (!this.form()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      this.formService.submitForm(this.formData());
      this.submissionSuccess.set(true);
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error) {
      this.errorMessage.set('Failed to submit form. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * Gets the value of a form field.
   * @param fieldId The ID of the field to get the value for.
   * @returns The value of the form field.
   */
  getFieldValue(fieldId: string): any {
    return this.formData()[fieldId] || '';
  }

  /**
   * Checks if the user is an admin.
   * @returns True if the user is an admin, false otherwise.
   */
  isUser(): boolean {
    return this.authService.isUser();
  }

  /**
   * Navigates back to the previous page.
   */
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Checks if the form has a submit button.
   * @param rows The rows of the form.
   * @returns True if the form has a submit button, false otherwise.
   */
  hasSubmitButton(rows: FormRow[]): boolean {
    return rows.some((row) =>
      row.fields.some(
        (field) => field.type === 'button' && field.buttonType === 'submit'
      )
    );
  }

  /**
   * Checks if the form can be deactivated.
   * @returns True if the form can be deactivated, false otherwise.
   */
  canDeactivate(): boolean {
    if (this.submissionSuccess()) {
      return true;
    }
    const hasData = Object.values(this.formData()).some((value) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== null && value !== undefined && value !== '';
    });

    if (hasData) {
      return confirm(
        'You have unsaved form data. Are you sure you want to leave?'
      );
    }
    return true;
  }
}
