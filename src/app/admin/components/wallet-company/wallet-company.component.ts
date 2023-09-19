import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';

@Component({
  selector: 'app-wallet-company',
  templateUrl: './wallet-company.component.html',
  styleUrls: ['./wallet-company.component.css']
})
export class WalletCompanyComponent implements OnInit {

  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;
  @ViewChild('successUpdateM')
  successUpdateM!: ModalAlertsComponent;
  @ViewChild('failUpdateM')
  failUpdateM!: ModalAlertsComponent;
  @ViewChild('infoDeleteM')
  infoDeleteM!: ModalAlertsComponent;
  @ViewChild('successDeleteM')
  successDeleteM!: ModalAlertsComponent;
  @ViewChild('failDeleteM')
  failDeleteM!: ModalAlertsComponent;

  options = [
    { value: 1, label: 'Crypto' },
    { value: 2, label: 'Bancos' },
    { value: 3, label: 'Electrónicos' },
  ];
  wallet!: WalletI
  form = new FormGroup({});
  formUpdate = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'alias',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Alias',
            placeholder: 'Alias',
            required: true,
          },
        },
        {
          key: 'tipo',
          type: 'select',
          className: 'w-100 mx-2',
          props: {
            label: 'Tipo',
            placeholder: 'Seleccione una opción',
            required: true,
            options: this.options
          },
        },

      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
        {
          key: 'sigla',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Sigla/Moneda',
            placeholder: 'Sigla/Moneda',
            required: true,
          },
        },
        {
          key: 'detalle',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Detalle',
            placeholder: 'Detalle',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'tag',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Tag/Titular',
            placeholder: 'Tag/Titular',
            required: false,
          },
        },
        {
          key: 'dir',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'N° Cuenta',
            placeholder: 'N° Cuenta',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'costo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Costo Retiro',
            placeholder: 'Costo Retiro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'minimo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Mínimo Retiro',
            placeholder: 'Mínimo Retiro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [

        {
          key: 'maxRetiroB',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Bronce',
            placeholder: 'Máximo retiro Bronce',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxRetiroP',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Plata ',
            placeholder: 'Máximo retiro Plata',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'maxRetiroO',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Oro',
            placeholder: 'Máximo retiro Oro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxRetiroD',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Diamante',
            placeholder: 'Máximo retiro Diamante',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    }
  ];

  fieldsUpdate: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'alias',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Alias',
            placeholder: 'Alias',
            required: true,
          },
        },
        {
          key: 'tipo',
          type: 'select',
          className: 'w-100 mx-2',
          props: {
            label: 'Tipo',
            placeholder: 'Seleccione una opción',
            required: true,
            options: this.options
          },
        },

      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
        {
          key: 'sigla',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Sigla/Moneda',
            placeholder: 'Sigla/Moneda',
            required: true,
          },
        },
        {
          key: 'detalle',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Detalle',
            placeholder: 'Detalle',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'tag',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Tag/Titular',
            placeholder: 'Tag/Titular',
            required: false,
          },
        },
        {
          key: 'dir',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'N° Cuenta',
            placeholder: 'N° Cuenta',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'costo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Costo Retiro',
            placeholder: 'Costo Retiro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'minimo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Mínimo Retiro',
            placeholder: 'Mínimo Retiro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [

        {
          key: 'maxRetiroB',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Bronce',
            placeholder: 'Máximo retiro Bronce',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxRetiroP',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Plata ',
            placeholder: 'Máximo retiro Plata',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'maxRetiroO',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Oro',
            placeholder: 'Máximo retiro Oro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxRetiroD',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Diamante',
            placeholder: 'Máximo retiro Diamante',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    }
  ];


  message = '';
  wallets: WalletI[] = []

  constructor(private adminService: AdminServiceService) { }

  async ngOnInit() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllBilleteraE()
      );

      if (response.data.length > 0) {
        this.wallets = response.data;
      }
    } catch (error: any) {
      this.wallets = [];
    }
  }

  onRedirigir() {
    location.reload();
  }

  findOption(value: number) {
    return this.options.find(f => f.value == value)!.label ?? '';
  }

  async onSubmit(model: WalletI) {
    try {
      const response = await lastValueFrom(
        this.adminService.createWalletE(model)
      );
      if (response.data !== null) {
        this.message = response.message;
        this.successCreateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failCreateM.abrir();
    }
  }

  onUpdate(data: WalletI) {
    this.wallet = { ...data };
  }

  onQuestion(data: WalletI) {
    this.wallet = data;
    this.infoDeleteM.abrir();
  }

  async onDelete() {
    try {
      const response = await lastValueFrom(
        this.adminService.deleteWallet(this.wallet._id!, this.wallet)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successDeleteM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failDeleteM.abrir();
    }
  }

  async onUpdateWallet(form: WalletI) {
    try {
      const response = await lastValueFrom(
        this.adminService.updateWallet(this.wallet._id!, form)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successUpdateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failUpdateM.abrir();
    }
  }
}
