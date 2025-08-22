import { DragDropModule } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldSettingsComponent } from './component/field-settings/field-settings.component';
import { CheckBoxFieldComponent } from './component/field-types/check-box-field/check-box-field.component';
import { SelectFieldComponent } from './component/field-types/select-field/select-field.component';
import { TextFieldComponent } from './component/field-types/text-field/text-field.component';
import { RadioFieldComponent } from './component/field-types/radio-field/radio-field.component';
import { DateFieldComponent } from './component/field-types/date-field/date-field.component';
import { ButtonFieldComponent } from './component/field-types/button-field/button-field.component';
import { FieldButtonComponent } from './component/form-elements/field-button/field-button.component';
import { FormElementsComponent } from './component/form-elements/form-elements.component';
import { FieldPreviewComponent } from './component/main-form/field-preview/field-preview.component';
import { FormEditorComponent } from './component/main-form/form-builder/form-editor.component';
import { FormFieldComponent } from './component/main-form/form-field/form-field.component';
import { FormPreviewComponent } from './component/main-form/form-preview/form-preview.component';
import { mainFormComponent } from './component/main-form/main-form.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavHeaderComponent } from './component/nav-header/nav-header.component';
import { FormSubmissionComponent } from './component/form-submission/form-submission.component';

@NgModule({
  declarations: [
    AppComponent,
    mainFormComponent,
    FormEditorComponent,
    FormElementsComponent,
    FieldButtonComponent,
    FormFieldComponent,
    TextFieldComponent,
    CheckBoxFieldComponent,
    FormPreviewComponent,
    FieldPreviewComponent,
    FieldSettingsComponent,
    SelectFieldComponent,
    RadioFieldComponent,
    DateFieldComponent,
    ButtonFieldComponent,
    LoginComponent,
    DashboardComponent,
    NavHeaderComponent,
    FormSubmissionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    DragDropModule,
    TitleCasePipe,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
