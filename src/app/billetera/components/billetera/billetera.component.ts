import { Component, ElementRef, ViewChild } from '@angular/core';
import { BilleteraServiceService } from '../../service/billetera-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';
import { BilleteraUserI } from '../../interfaces/billetera';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';


@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.component.html',
  styleUrls: ['./billetera.component.css']
})
export class BilleteraComponent {
  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;
  @ViewChild('successValidOtp')
  successValidOtp!: ModalAlertsComponent;
  @ViewChild('failValidOtp')
  failValidOtp!: ModalAlertsComponent;
  @ViewChild('successUpdateM')
  successUpdateM!: ModalAlertsComponent;
  @ViewChild('failUpdateM')
  failUpdateM!: ModalAlertsComponent;
  @ViewChild('otp') otp: any;
  @ViewChild('modalButton') modalButton!: ElementRef;
  @ViewChild('modalUpdateButton') modalUpdateButton!: ElementRef;

  form = new FormGroup({});
  formUpdate = new FormGroup({});
  options = [
    { value: 1, label: 'Crypto' },
    { value: 2, label: 'Bancos' },
    { value: 2, label: 'Electrónicos' },
  ];
  id!: string;
  model: any = {};
  billetera: BilleteraUserI[] = [];
  msj: string = '';
  walletsC: WalletI[] = [];
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
            label: 'Tipo Billetera',
            placeholder: 'Seleccione una opción',
            required: true,
            options: []
          },
        },

      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
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
        {
          key: 'tag',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Tag/Titular',
            placeholder: 'Tag/Titular',
            required: false,
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
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
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
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
        {
          key: 'tag',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Tag/Titular',
            placeholder: 'Tag/Titular',
            required: false,
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
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
  ];
  message: string = "";
  walletUser!: BilleteraUserI;

  constructor(
    private router: Router,
    private billeteraService: BilleteraServiceService,
    private adminService: AdminServiceService,
    public constante: ConstantsSystem,
  ) { }


  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
      this.getBilleteraUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  onRedirigir() {
    location.reload();
  }

  async getBilleteraUser() {
    try {
      const response = await lastValueFrom(this.billeteraService.getAllBilleteraUser(this.id));
      if (response.data !== null) {
        this.billetera = response.data;
        this.getBilleteraE();
      }
    } catch (error: any) {
      this.billetera = [];
    }
  }

  async getBilleteraE() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllBilleteraE()
      );

      if (response.data.length > 0) {
      
        this.walletsC = response.data;
        this.billetera.forEach(item => {
          this.walletsC = this.walletsC.filter(f => f._id != item.tipo);
        })
        this.fields[0]!.fieldGroup![1].props!.options = this.walletsC.map(f => {
          return {
            label: f.alias,
            value: f._id
          }
        });
      }
    } catch (error: any) {
      this.walletsC = [];
    }
  }

  async onSaveWalletUser(model: BilleteraUserI) {
    try {
      model.userId = this.id;
      const response = await lastValueFrom(
        this.billeteraService.createWalletUser(model)
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

  onUpdate(data: BilleteraUserI) {
   // this.createOpt();
    this.walletUser = { ...data };
    this.modalUpdateButton.nativeElement.click();

    //modificar para enviar el codigo otp
  }


  async onUpdateWalletUser(form: BilleteraUserI) {
    try {
      const response = await lastValueFrom(
        this.billeteraService.updateWalletUser(this.walletUser._id!, form)
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

  async validateOtp() {
    try {
      const response = await lastValueFrom(
        this.billeteraService.validOpt(this.id, this.otp)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.modalUpdateButton.nativeElement.click();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failValidOtp.abrir();
    }
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  async createOpt() {
    try {
      const response = await lastValueFrom(
        this.billeteraService.createOpt(this.id)
      );

      if (response.data !== null) {
        this.message = response.data;
        this.successValidOtp.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failValidOtp.abrir();
    }
  }

  openOtpModal() {
    this.modalButton.nativeElement.click();
  }

 }
