import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      imports: [MatFormFieldModule, MatInputModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    
    component.field = (() => ({
      id: '1',
      type: 'text',
      label: 'Test Text Field',
      required: true
    })) as unknown as typeof component.field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
