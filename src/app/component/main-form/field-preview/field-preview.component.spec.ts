import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FieldPreviewComponent } from './field-preview.component';
import { TextFieldComponent } from '../../field-types/text-field/text-field.component';
import { SelectFieldComponent } from '../../field-types/select-field/select-field.component';
import { CheckBoxFieldComponent } from '../../field-types/check-box-field/check-box-field.component';
import { RadioFieldComponent } from '../../field-types/radio-field/radio-field.component';
import { DateFieldComponent } from '../../field-types/date-field/date-field.component';
import { ButtonFieldComponent } from '../../field-types/button-field/button-field.component';

describe('FieldPreviewComponent', () => {
  let component: FieldPreviewComponent;
  let fixture: ComponentFixture<FieldPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FieldPreviewComponent,
        TextFieldComponent,
        SelectFieldComponent,
        CheckBoxFieldComponent,
        RadioFieldComponent,
        DateFieldComponent,
        ButtonFieldComponent,
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldPreviewComponent);
    component = fixture.componentInstance;

    component.field = (() => ({
      id: '1',
      type: 'text',
      label: 'Test Field',
      required: true,
    })) as unknown as typeof component.field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
