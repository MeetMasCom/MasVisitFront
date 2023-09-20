import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { RechargeI, ReviewRechargeI } from 'src/app/finance/interfaces/balanceUser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';

@Component({
  selector: 'app-admin-rechargs',
  templateUrl: './admin-rechargs.component.html',
  styleUrls: ['./admin-rechargs.component.css'],
})
export class AdminRechargsComponent implements OnInit {
  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;

  message = '';
  data: RechargeI[] = [];
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
        {
          key: 'dir',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Dirección/Correo',
            placeholder: 'Dirección/Correo',
            required: true,
            disabled: true,
          },
        },
        {
          key: 'hash',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'N° Documento',
            placeholder: 'N° Documento',
            required: true,
            disabled: true,
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'amount',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Valor',
            placeholder: 'Valor',
            required: true,
            disabled: true,
          },
          validators: {
            validation: ['price']
          }
        },
        {
          key: 'detail',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Detalle',
            placeholder: 'Detalle',
            required: true,
            disabled: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'walletId',
          className: 'w-100 mx-2',
          type: 'select',
          props: {
            label: 'Billetera',
            placeholder: 'Billetera',
            required: true,
            disabled: true,
            options: [],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'remark',
          className: 'w-100 mx-2',
          type: 'textarea',
          props: {
            label: 'Observación',
            placeholder: 'Observación',
            required: false,
            rows: 4
          },
        },
      ]
    },
  ];
  wallets: WalletI[] = [];

  constructor(private adminService: AdminServiceService) { }

  async ngOnInit() {
    this.getWalletE();
    await this.getRechargs();
  }

  getWalletE() {
    this.adminService.getAllBilleteraE().subscribe(res => {
      this.wallets = res.data,
        this.fields[2].fieldGroup![0].props!.options = this.wallets.map(f => {
          return {
            label: f.alias,
            value: f._id
          }
        });
    })
  }


  async getRechargs() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllRechargs()
      );

      if (response.data.length > 0) {
        this.data = response.data;
      }
    } catch (error: any) {
      this.data = [];
    }
  }

  onRedirigir() {
    location.reload();
  }

  onSubmit(data: RechargeI, status: number) {

   // console.log(data);
    if (status == 2) {
      this.fields[3].fieldGroup![0].props!.required = true;
    } else {
      this.fields[3].fieldGroup![0].props!.required = false;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ReviewRechargeI = {
      id: data.id!,
      remark: data.remark!,
      status,
      value: data.amount
    }
    this.adminService.reviewRecharg(payload).subscribe({
      next: () => {
        this.successCreateM.abrir();
      },
      error: () => {
        this.failCreateM.abrir();
      }
    });
  }

  setRecharg(item: RechargeI) {
    this.model = item;
  }

}
