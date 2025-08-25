import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormElementsComponent } from './form-elements.component';
import { FieldButtonComponent } from './field-button/field-button.component';

describe('FormElementsComponent', () => {
  let component: FormElementsComponent;
  let fixture: ComponentFixture<FormElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormElementsComponent, FieldButtonComponent],
      imports: [DragDropModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
