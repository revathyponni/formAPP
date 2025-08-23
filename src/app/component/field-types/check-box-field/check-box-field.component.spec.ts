import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxFieldComponent } from './check-box-field.component';

describe('CheckBoxFieldComponent', () => {
  let component: CheckBoxFieldComponent;
  let fixture: ComponentFixture<CheckBoxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckBoxFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBoxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
