import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { StoredForm, FormSubmission } from './form-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private formsKey = 'formApp_forms_mock';
  private submissionsKey = 'formApp_submissions_mock';

  // Simulate API delay
  private readonly API_DELAY = 300;

  // Get all forms from mock storage
  getForms(): Observable<StoredForm[]> {
    return of(this.getAllForms()).pipe(delay(this.API_DELAY));
  }

  // Save form to mock storage
  saveForm(form: Omit<StoredForm, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Observable<StoredForm> {
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

    localStorage.setItem(this.formsKey, JSON.stringify(updatedForms));
    return of(formToSave).pipe(delay(this.API_DELAY));
  }

  // Delete form from mock storage
  deleteForm(id: string): Observable<void> {
    const forms = this.getAllForms().filter(form => form.id !== id);
    localStorage.setItem(this.formsKey, JSON.stringify(forms));

    // Also delete submissions for this form
    const submissions = this.getAllSubmissions();
    const updatedSubmissions = submissions.filter(sub => sub.formId !== id);
    localStorage.setItem(this.submissionsKey, JSON.stringify(updatedSubmissions));

    return of(void 0).pipe(delay(this.API_DELAY));
  }

  // Get all submissions from mock storage
  getSubmissions(): Observable<FormSubmission[]> {
    return of(this.getAllSubmissions()).pipe(delay(this.API_DELAY));
  }

  // Get submissions for a specific form
  getFormSubmissions(formId: string): Observable<FormSubmission[]> {
    const submissions = this.getAllSubmissions();
    const filtered = submissions.filter(sub => sub.formId === formId);
    return of(filtered).pipe(delay(this.API_DELAY));
  }

  // Save submission to mock storage
  saveSubmission(formId: string, data: Record<string, any>): Observable<FormSubmission> {
    const submission: FormSubmission = {
      id: crypto.randomUUID(),
      formId,
      data,
      submittedAt: new Date()
    };

    const submissions = this.getAllSubmissions();
    submissions.push(submission);
    localStorage.setItem(this.submissionsKey, JSON.stringify(submissions));

    return of(submission).pipe(delay(this.API_DELAY));
  }

  // Delete submission from mock storage
  deleteSubmission(id: string): Observable<void> {
    const submissions = this.getAllSubmissions().filter(sub => sub.id !== id);
    localStorage.setItem(this.submissionsKey, JSON.stringify(submissions));
    return of(void 0).pipe(delay(this.API_DELAY));
  }

  // Clear all data from mock storage
  clearAllData(): Observable<void> {
    localStorage.removeItem(this.formsKey);
    localStorage.removeItem(this.submissionsKey);
    return of(void 0).pipe(delay(this.API_DELAY));
  }

  // Private helper methods for localStorage operations
  private getAllForms(): StoredForm[] {
    try {
      const stored = localStorage.getItem(this.formsKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private getAllSubmissions(): FormSubmission[] {
    try {
      const stored = localStorage.getItem(this.submissionsKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}
