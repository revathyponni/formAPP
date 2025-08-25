import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FieldPreviewComponent } from '../field-preview/field-preview.component';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent, FieldPreviewComponent],
      imports: [MatFormFieldModule, MatSelectModule, MatOptionModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;

    // Create a mock function for the input signal
    // Use type assertion to bypass TypeScript checking
    component.field = (() => ({
      id: '1',
      type: 'text',
      label: 'Test Field',
      required: true
    })) as unknown as typeof component.field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
