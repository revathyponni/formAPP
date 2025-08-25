import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isAdmin: jasmine.createSpy('isAdmin').and.returnValue(false),
      isLoggingOut: jasmine.createSpy('isLoggingOut').and.returnValue(false),
      currentUserValue: null,
      currentUser: of(null),
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [DashboardComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isAdmin when user is admin', () => {
    authServiceMock.isAdmin.and.returnValue(true);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.isAdmin()).toBeTrue();
  });

  it('should return false for isAdmin when user is not admin', () => {
    authServiceMock.isAdmin.and.returnValue(false);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.isAdmin()).toBeFalse();
  });

  it('should return true from canDeactivate when isLoggingOut is true', () => {
    authServiceMock.isLoggingOut.and.returnValue(true);
    expect(component.canDeactivate()).toBeTrue();
  });

  it('should confirm when canDeactivate is called and isLoggingOut is false', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    authServiceMock.isLoggingOut.and.returnValue(false);
    expect(component.canDeactivate()).toBeTrue();
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to leave? Any unsaved changes may be lost.'
    );
  });

  it('should return false from canDeactivate when user cancels confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    authServiceMock.isLoggingOut.and.returnValue(false);
    expect(component.canDeactivate()).toBeFalse();
  });
});
