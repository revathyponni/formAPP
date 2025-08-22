import { Injectable, inject } from '@angular/core';
import { FormRow } from '../models/field';
import { MockApiService } from './mock-api.service';

export interface StoredForm {
  id: string;
  name: string;
  rows: FormRow[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FormStorageService {
  private mockApi = inject(MockApiService);

  // Form management methods - using localStorage directly for synchronous operations
  saveForm(form: Omit<StoredForm, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): StoredForm {
    const forms = this.getAllForms();
    const now = new Date();

    let formToSave: StoredForm;

    if (form.id && forms.some(f => f.id === form.id)) {
      // Update existing form
      formToSave = {
        ...forms.find(f => f.id === form.id)!,
        ...form,
        updatedAt: now
      };
    } else {
      // Create new form
      formToSave = {
        id: crypto.randomUUID(),
        name: form.name || 'Untitled Form',
        rows: form.rows,
        createdAt: now,
        updatedAt: now
      };
    }

    const updatedForms = forms.filter(f => f.id !== formToSave.id);
    updatedForms.push(formToSave);

    localStorage.setItem('formApp_forms_mock', JSON.stringify(updatedForms));
    return formToSave;
  }

  getForm(id: string): StoredForm | null {
    const forms = this.getAllForms();
    return forms.find(form => form.id === id) || null;
  }

  getAllForms(): StoredForm[] {
    try {
      const stored = localStorage.getItem('formApp_forms_mock');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  deleteForm(id: string): void {
    const forms = this.getAllForms().filter(form => form.id !== id);
    localStorage.setItem('formApp_forms_mock', JSON.stringify(forms));

    // Also delete submissions for this form
    const submissions = this.getFormSubmissions(id);
    submissions.forEach(sub => this.deleteSubmission(sub.id));
  }

  // Submission management methods
  saveSubmission(formId: string, data: Record<string, any>): FormSubmission {
    const submission: FormSubmission = {
      id: crypto.randomUUID(),
      formId,
      data,
      submittedAt: new Date()
    };

    const submissions = this.getAllSubmissions();
    submissions.push(submission);
    localStorage.setItem('formApp_submissions_mock', JSON.stringify(submissions));

    return submission;
  }

  getFormSubmissions(formId: string): FormSubmission[] {
    const submissions = this.getAllSubmissions();
    return submissions.filter(sub => sub.formId === formId);
  }

  getAllSubmissions(): FormSubmission[] {
    try {
      const stored = localStorage.getItem('formApp_submissions_mock');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  deleteSubmission(id: string): void {
    const submissions = this.getAllSubmissions().filter(sub => sub.id !== id);
    localStorage.setItem('formApp_submissions_mock', JSON.stringify(submissions));
  }

  clearAllData(): void {
    localStorage.removeItem('formApp_forms_mock');
    localStorage.removeItem('formApp_submissions_mock');
  }
}
