import { Component, computed, inject, signal } from '@angular/core';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/navigation.guard';

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
  formService = inject(FormService);
  authService = inject(AuthService);
  router = inject(Router);

  // Computed property to check if user is admin
  isAdmin = computed(() => this.authService.isAdmin());

  constructor() {
    // If user is not admin, force preview mode
    if (!this.isAdmin()) {
      this.activeTab.set('preview');
    }
  }

  openSaveModal() {
    this.formName.set('');
    this.saveSuccess.set(false);
    this.saveError.set('');
    this.showSaveModal.set(true);
  }

  closeSaveModal() {
    this.showSaveModal.set(false);
  }

  saveForm() {
    if (!this.formName().trim()) {
      this.saveError.set('Please enter a form name');
      return;
    }

    try {
      const savedForm = this.formService.saveCurrentForm(this.formName().trim());
      this.saveSuccess.set(true);
      this.saveError.set('');

      // Close modal after 2 seconds
      setTimeout(() => {
        this.closeSaveModal();
      }, 2000);
    } catch (error) {
      this.saveError.set('Failed to save form. Please try again.');
    }
  }

  shareForm(formId: string) {
    // Create shareable URL
    const url = `${window.location.origin}/form/${formId}`;

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert('Form URL copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy URL. Please copy it manually: ' + url);
    });
  }

  getSavedForms() {
    return this.formService.getAllStoredForms();
  }

  loadSavedForm(formId: string) {
    const success = this.formService.loadForm(formId);
    if (success) {
      this.activeTab.set('edit');
    } else {
      alert('Failed to load form');
    }
  }

  canDeactivate(): boolean {
    if (this.formService.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }
}
