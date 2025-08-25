import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FieldPreviewComponent } from '../../main-form/field-preview/field-preview.component';
import { SelectFieldComponent } from './select-field.component';

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent;
  let fixture: ComponentFixture<SelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFieldComponent, FieldPreviewComponent],
      imports: [MatFormFieldModule, MatSelectModule, MatOptionModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
    component.field = (() => ({
      id: '1',
      type: 'select',
      label: 'Test Select',
      required: true,
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ]
    })) as unknown as typeof component.field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
