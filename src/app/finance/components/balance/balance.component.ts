import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FinanceServiceService } from "../../services/finance-service.service";
import { AdminServiceService } from "src/app/admin/services/admin-service.service";
import { WalletI } from "src/app/shared/interfaces/wallet.interface";
import { BalanceUserI, RechargeI, RecordsI, RetreatI } from "../../interfaces/balanceUser";
import { lastValueFrom } from "rxjs";
import { ModalAlertsComponent } from "src/app/shared/components/modal-alerts/modal-alerts.component";
import { ToastrService } from "ngx-toastr";
import { BilleteraServiceService } from "src/app/billetera/service/billetera-service.service";
import { BilleteraUserI } from "src/app/billetera/interfaces/billetera";
import { UserServiceService } from "src/app/user/services/user-service.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent {
  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;
  balances: BalanceUserI[] = [];
  rechargs: RechargeI[] = [];
  wallets: WalletI[] = [];
  form = new FormGroup({});
  formRetreat = new FormGroup({});
  model: any = {};
  modelRetreat: any = {};
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
            placeholder: 'Selecciona una opción',
            required: true,
            options: [],
          },
        },
      ]
    },
  ];
  fieldsRetreat: FormlyFieldConfig[] = [
    {
      key: 'walletId',
      type: 'select',
      props: {
        label: 'Billetera',
        placeholder: 'Selecciona una opción',
        required: true,
        options: [],
      },
    },
    {
      key: 'amount',
      type: 'input',
      props: {
        label: 'Cantidad',
        placeholder: 'Cantidad',
        required: true,
      },
      validators: {
        validation: ['price']
      }
    },
  ];
  message = '';
  records: RecordsI[] = []
  file: string = "";
  id!: string;
  billetera: BilleteraUserI[] = [];
  currentMembership!: string
  retreats: RetreatI[] = []


  constructor(private billeteraService: BilleteraServiceService, private userService: UserServiceService,
    private toastrService: ToastrService, private financeServiceService: FinanceServiceService, private aminServiceService: AdminServiceService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    this.getFinance();
    this.getRetreatUser();
    this.getBalance();
    this.getWalletE();
    this.getWalletU();
    this.getCurrentMembership();
  }

  getFinance() {
    const user = sessionStorage.getItem('id')
    this.financeServiceService.getAllByUser(user!).subscribe(res => {
      this.rechargs = res.data.map((f: RechargeI) => {
        switch (f.status) {
          case 0:
            f.statusDetail = 'Enviado';
            break;
          case 1:
            f.statusDetail = 'Aprobado';
            break;
          case 2:
            f.statusDetail = 'Rechazado';
            break;
        }
        return f;
      })
    })
  }

  getRetreatUser() {
    this.financeServiceService.getRetreatUser(this.id).subscribe(res => {
      this.retreats = res.data.map((f: RechargeI) => {
        switch (f.status) {
          case 0:
            f.statusDetail = 'Enviado';
            break;
          case 1:
            f.statusDetail = 'Aprobado';
            break;
          case 2:
            f.statusDetail = 'Rechazado';
            break;
        }
        return f;
      })
    })
  }

  async getBalance() {
    const user = sessionStorage.getItem('id')
    const resp = await lastValueFrom(
      this.financeServiceService.getBalanceByUser(user!)
    );
      if(resp.data[0] !==null){
        this.balances = resp.data;
      }     
     
    
  }

  getWalletE() {
    this.aminServiceService.getAllBilleteraE().subscribe(res => {
      this.wallets = res.data,
        this.fields[2].fieldGroup![0].props!.options = this.wallets.map(f => {
          return {
            label: f.alias,
            value: f._id
          }
        });
    })
  }

  getWalletU() {
    this.billeteraService.getAllBilleteraUser(this.id).subscribe(res => {
      this.billetera = res.data;
      this.fieldsRetreat[0].props!.options = this.billetera.map(f => {
        return {
          label: f.alias,
          value: f._id
        }
      });
    })
  }


  async onSubmit(item: RechargeI) {
    try {
      if (this.file == "") {
        this.toastrService.warning("Debes adjuntar una imágen", "Aviso");
        return;
      }

      item.file = this.file;
      const response = await lastValueFrom(
        this.financeServiceService.rechargeBalance(item)
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

  async onSubmitRetreat(item: RetreatI) {
    try {
      const response = await lastValueFrom(
        this.financeServiceService.retreatBalance(item)
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

  onRedirigir() {
    location.reload();
  }

  async getDetail(data: BalanceUserI) {
    try {
      this.records = [];
      const user = sessionStorage.getItem('id')
      const response = await lastValueFrom(
        this.financeServiceService.getDetail(user!, data.walletId)
      );

      if (response.data !== null) {
        this.records = response.data;
      }
    } catch (error: any) {
      this.records = [];
    }
  }

  setFile(event: any) {
    const file = event.target.files[0];
    if (file && file.type.includes('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.file = base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  findWallet() {
    return this.wallets.find(f => f._id == this.model.walletId);
  }

  findWalletRetreat() {
    const walletUser = this.billetera.find(f => f._id == this.modelRetreat.walletId);
    return this.wallets.find(f => f._id == walletUser?.tipo ?? '');
  }

  async getCurrentMembership() {
    try {
      const response = await lastValueFrom(this.userService.getCurrentMembership(this.id));
      if (response.data == null) {
        this.currentMembership = "BRONCE"
      } else {
        this.currentMembership = response.data.name.toUpperCase();
      }
    } catch (error: any) {
      this.currentMembership = "BRONCE";
    }
  }


}
