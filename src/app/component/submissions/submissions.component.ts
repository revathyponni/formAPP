import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { FormStorageService, FormSubmission, StoredForm } from '../../services/form-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submissions',
  standalone: false,
  templateUrl: './submissions.component.html',
  styleUrls: []
})
export class SubmissionsComponent implements OnInit {
  private formService = inject(FormService);
  private authService = inject(AuthService);
  private formStorage = inject(FormStorageService);
  private router = inject(Router);

  // Signals
  submissions = signal<FormSubmission[]>([]);
  forms = signal<StoredForm[]>([]);
  isLoading = signal(true);
  selectedFormId = signal<string>('all');
  searchTerm = signal('');
  dateFilter = signal<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  // Computed properties
  isAdmin = computed(() => this.authService.isAdmin());
  filteredSubmissions = computed(() => {
    let filtered = this.submissions();

    // Filter by selected form
    if (this.selectedFormId() !== 'all') {
      filtered = filtered.filter(sub => sub.formId === this.selectedFormId());
    }

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(sub => {
        const form = this.forms().find(f => f.id === sub.formId);
        return form?.name.toLowerCase().includes(term) ||
               JSON.stringify(sub.data).toLowerCase().includes(term);
      });
    }

    // Filter by date range
    if (this.dateFilter().start || this.dateFilter().end) {
      filtered = filtered.filter(sub => {
        const submittedAt = new Date(sub.submittedAt);
        const start = this.dateFilter().start ? new Date(this.dateFilter().start!) : null;
        const end = this.dateFilter().end ? new Date(this.dateFilter().end!) : null;

        if (start && submittedAt < start) return false;
        if (end && submittedAt > end) return false;
        return true;
      });
    }

    return filtered.sort((a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  });

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);

    // Load all submissions
    const allSubmissions = this.formStorage.getAllSubmissions();
    this.submissions.set(allSubmissions);

    // Load all forms for reference
    const allForms = this.formService.getAllStoredForms();
    this.forms.set(allForms);

    this.isLoading.set(false);
  }

  onFormFilterChange(formId: string) {
    this.selectedFormId.set(formId);
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
  }

  onDateFilterChange(start: string | null, end: string | null) {
    this.dateFilter.set({
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null
    });
  }

  clearFilters() {
    this.selectedFormId.set('all');
    this.searchTerm.set('');
    this.dateFilter.set({ start: null, end: null });
  }

  getFormName(formId: string): string {
    const form = this.forms().find(f => f.id === formId);
    return form?.name || 'Unknown Form';
  }

  getDataKeys(data: Record<string, any>): string[] {
    return Object.keys(data || {});
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatDisplayDate(date: Date | string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
  }

  onStartDateChange(dateString: string) {
    const start = dateString ? new Date(dateString) : null;
    this.dateFilter.set({
      ...this.dateFilter(),
      start: start
    });
  }

  onEndDateChange(dateString: string) {
    const end = dateString ? new Date(dateString) : null;
    this.dateFilter.set({
      ...this.dateFilter(),
      end: end
    });
  }

  viewSubmissionDetails(submission: FormSubmission) {
    // Navigate to a detailed view or show modal
    console.log('View submission:', submission);
    // You could implement a modal or separate detail view here
  }

  deleteSubmission(submissionId: string) {
    if (confirm('Are you sure you want to delete this submission?')) {
      this.formStorage.deleteSubmission(submissionId);
      this.loadData(); // Reload data
    }
  }

  exportSubmissions() {
    const data = this.filteredSubmissions().map(sub => ({
      ...sub,
      formName: this.getFormName(sub.formId),
      submittedAt: new Date(sub.submittedAt).toLocaleString()
    }));

    const csv = this.convertToCSV(data);
    this.downloadCSV(csv, 'form-submissions.csv');
  }

  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0] || {});
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',')
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(',')
      )
    ];
    return csvRows.join('\n');
  }

  private downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  goToFormBuilder() {
    this.router.navigate(['/dashboard']);
  }
}
