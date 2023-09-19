import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { WalletI } from '../../interfaces/wallet.interface';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.css'],
})
export class ModalAlertsComponent {
  selectedValue: string='';
  @Input() idModal: string = '';
  @Input() icono: string = '';
  @Input() titulo: string = '';
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() tipo: number = -1;
  @Input() data: any;
  @Input() references: any;
  @Input() cuponS: any;
  @Input() cupon: any;
  @Input() userId: any;
  @Input() cupoId: any;
 
  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @Output() sendModal: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedCupo: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalButton') modalButton!: ElementRef;


  public Editor = ClassicEditor;
  statusCantidad: boolean=false;

  abrir() {
    this.modalButton.nativeElement.click();
  }

  onSuccess() {
    this.successModal.emit();
  }

  onRecover(form: any) {
    this.sendModal.emit(form);
  }

  onUpdateMembership(form: any, data: any) {
    form.value['descMember'] = data.description;
    this.sendModal.emit(form);
  }

  onUpdateCupo(form:any){
    this.sendModal.emit(form);
  }

  onDarCupo(form:any){
    this.sendModal.emit(form);
  }

  selectCupo(event:any){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
    this.onSelectedCupo.emit(this.selectedValue);
  }

  onValidateCantidad(param:number){
    if (param <= this.cupoId[0].cantidad) {
      this.statusCantidad = false;
    } else {
      this.statusCantidad = true;
    }
  }

}
