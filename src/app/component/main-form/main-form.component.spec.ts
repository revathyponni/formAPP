import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mainFormComponent } from './main-form.component';

describe('mainFormComponent', () => {
  let component: mainFormComponent;
  let fixture: ComponentFixture<mainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [mainFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(mainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
