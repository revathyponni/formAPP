import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mainFormComponent } from './main-form.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

describe('mainFormComponent', () => {
  let component: mainFormComponent;
  let fixture: ComponentFixture<mainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [mainFormComponent, FormPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(mainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
