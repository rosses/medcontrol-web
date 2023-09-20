import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { CheckboxCmpComponent } from './checkbox-cmp/checkbox-cmp.component';
import { ModalCmpComponent } from './modal-cmp/modal-cmp.component';
import { PinCodeComponent } from './pin-code/pin-code.component';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';
import { RadioBtnComponent } from './radio-btn/radio-btn.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    MenuHeaderComponent,
    MenuSidebarComponent,
    PageHeaderComponent,
    LoaderComponent,
    CheckboxCmpComponent,
    ModalCmpComponent,
    PinCodeComponent,
    ConfirmActionModalComponent,
    RadioBtnComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    GooglePlaceModule
  ],
  exports: [
    FontAwesomeModule,
    MenuHeaderComponent,
    MenuSidebarComponent,
    PageHeaderComponent,
    LoaderComponent,
    CheckboxCmpComponent,
    ModalCmpComponent,
    PinCodeComponent,
    ConfirmActionModalComponent,
    RadioBtnComponent
  ]
})
export class SharedModule { }
