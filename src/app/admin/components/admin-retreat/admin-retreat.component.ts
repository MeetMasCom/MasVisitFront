import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import {
  RechargeI,
  RetreatI,
  ReviewRechargeI,
  ReviewRetreatI,
} from 'src/app/finance/interfaces/balanceUser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';
import { FinanceServiceService } from 'src/app/finance/services/finance-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-retreat',
  templateUrl: './admin-retreat.component.html',
  styleUrls: ['./admin-retreat.component.css'],
})
export class AdminRetreatComponent implements OnInit {
  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;

  message = '';
  data: RetreatI[] = [];
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'amount',
      type: 'input',
      props: {
        label: 'Valor',
        placeholder: 'Valor',
        required: true,
      },
      validators: {
        validation: ['price'],
      },
    },
    {
      key: 'remark',
      type: 'textarea',
      props: {
        label: 'Observación',
        placeholder: 'Observación',
        required: true,
        rows: 4,
      },
    },
  ];
  wallets: WalletI[] = [];

  constructor(
    private toastrService: ToastrService,
    private adminService: AdminServiceService,
    private financeServiceService: FinanceServiceService
  ) {}

  ngOnInit() {
    this.getRetreats();
  }

  async getRetreats() {
    try {
      const response = await lastValueFrom(
        this.financeServiceService.getAllRetreats()
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

  onSubmit(data: RetreatI, status: number) {
    if (status == 1) {
      if (data.file == '') {
        this.toastrService.warning('Debes adjuntar una imágen', 'Aviso');
        return;
      }
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ReviewRetreatI = {
      id: data._id!,
      remark: data.remark!,
      file: data.file!,
      status,
      value: data.amount,
    };
    this.adminService.reviewRetrat(payload).subscribe({
      next: () => {
        this.successCreateM.abrir();
      },
      error: () => {
        this.failCreateM.abrir();
      },
    });
  }

  setRetreat(item: RetreatI) {
    this.model = { ...item };
  }

  setFile(event: any) {
    const file = event.target.files[0];
    if (file && file.type.includes('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.model.file = base64String;
      };
      reader.readAsDataURL(file);
    }
  }
}
