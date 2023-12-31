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
import { PeopleNewComponent } from './people-new/people-new.component';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxRutModule } from '@numetalsour/ngx-rut';
import { SchedulerConfirmationComponent } from './scheduler-confirmation/scheduler-confirmation.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionCompleteComponent } from './session-complete/session-complete.component';
import { MasterdataEditorComponent } from './masterdata-editor/masterdata-editor.component';
import { OrderResultComponent } from './order-result/order-result.component';
import { EvolutionAddComponent } from './evolution-add/evolution-add.component';

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
    PeopleNewComponent,
    SchedulerConfirmationComponent,
    SessionCompleteComponent,
    MasterdataEditorComponent,
    OrderResultComponent,
    EvolutionAddComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    GooglePlaceModule,
    FormsModule,
    InputMaskModule,
    NgxRutModule,
    NgbNavModule
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
    RadioBtnComponent,
    PeopleNewComponent,
    SchedulerConfirmationComponent,
    SessionCompleteComponent,
    MasterdataEditorComponent,
    OrderResultComponent,
    EvolutionAddComponent
  ]
})
export class SharedModule { }
