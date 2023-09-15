import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../enviroments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ConstantsSystem } from './utils/constants-system';
import { ClipboardModule } from 'ngx-clipboard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

//SERVICES

//INTERCEPTORS

//MODULES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  return /^\d+(?:\.\d{1,2})?$/.test(control.value) ? null : { price: true };
}

export function urlValidator(
  control: AbstractControl
): ValidationErrors | null {
  return /^(https?|ftp):\/\/(www\.)?([^\s\/$.?#].[^\s]*)\.[^\s]{2,}$/.test(
    control.value
  )
    ? null
    : { url: true };
}

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FontAwesomeModule,
    NgOtpInputModule,
    NgOptimizedImage,
    CommonModule,
    ClipboardModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormlyModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'Campo Obligatorio' },
        { name: 'price', message: 'Valor no válido' },
        { name: 'url', message: 'Valor no válido' },
      ],
      validators: [
        { name: 'price', validation: numberValidator },
        { name: 'url', validation: urlValidator },
      ],
    }),
    FormlyBootstrapModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
  
    ConstantsSystem,

    
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
