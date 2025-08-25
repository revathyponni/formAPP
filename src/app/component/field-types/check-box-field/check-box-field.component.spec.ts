import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckBoxFieldComponent } from './check-box-field.component';
import { FormField } from '../../../models/field';

describe('CheckBoxFieldComponent', () => {
  let component: CheckBoxFieldComponent;
  let fixture: ComponentFixture<CheckBoxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckBoxFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBoxFieldComponent);
    component = fixture.componentInstance;

    component.field = (() => ({
      id: '1',
      type: 'checkbox',
      label: 'Test Checkbox',
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

  it('should return options from the field', () => {
    const options = component.getOptions();
    expect(options).toEqual([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]);
  });
});
