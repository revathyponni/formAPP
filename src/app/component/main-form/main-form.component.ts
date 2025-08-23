import { Component, computed, inject, signal } from '@angular/core';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/navigation.guard';
import { StoredForm } from '../../models/form';

/**
 * This component is used to create and manage forms.
 */
@Component({
  selector: 'app-main-form',
  standalone: false,
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class mainFormComponent implements CanComponentDeactivate {
  activeTab = signal<'edit' | 'preview'>('edit');
  showSaveModal = signal(false);
  formName = signal('');
  saveSuccess = signal(false);
  saveError = signal('');

  //Injections
  private authService = inject(AuthService);
  private router = inject(Router);
  formService = inject(FormService);

  isAdmin = computed(() => this.authService.isAdmin());

  constructor() {
    if (!this.isAdmin()) {
      this.activeTab.set('preview');
    }
  }

  /**
   * This method is used to save modal.
   */
  openSaveModal(): void {
    this.formName.set('');
    this.saveSuccess.set(false);
    this.saveError.set('');
    this.showSaveModal.set(true);
  }

  /**
   * This method is used to close the save modal.
   */
  closeSaveModal(): void {
    this.showSaveModal.set(false);
  }

  /**
   * This method is used to save the form.
   */
  saveForm(): void {
    if (!this.formName().trim()) {
      this.saveError.set('Please enter a form name');
      return;
    }

    try {
      const savedForm = this.formService.saveCurrentForm(this.formName().trim());
      this.saveSuccess.set(true);
      this.saveError.set('');

      setTimeout(() => {
        this.closeSaveModal();
      }, 2000);
    } catch (error) {
      this.saveError.set('Failed to save form. Please try again.');
    }
  }

  /**
   * This method is used to share the form URL.
   */
  shareForm(formId: string): void {
    const url = `${window.location.origin}/form/${formId}`;

    navigator.clipboard.writeText(url).then(() => {
      alert('Form URL copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy URL. Please copy it manually: ' + url);
    });
  }

  /**
   * This method is used to get all saved forms.
   */
  getSavedForms(): StoredForm[] {
    return this.formService.getAllStoredForms();
  }

  /**
   * This method is used to load a saved form.
   */
  loadSavedForm(formId: string): void {
    const success = this.formService.loadForm(formId);
    if (success) {
      this.activeTab.set('edit');
    } else {
      alert('Failed to load form');
    }
  }

  /**
   * This method is used to check if the component can be deactivated.
   */
  canDeactivate(): boolean {
    if (this.formService.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }
}
