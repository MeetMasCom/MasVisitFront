import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import * as moment from 'moment';
import { FinanceServiceService } from 'src/app/finance/services/finance-service.service';
import { BalanceUserI, ReviewRechargeI } from 'src/app/finance/interfaces/balanceUser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
moment.locale("es");

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class UserMembershipComponent implements OnInit {
  @ViewChild('infoBuyMembership') infoBuyMembership!: ModalAlertsComponent;
  @ViewChild('successBuyM') successBuyM!: ModalAlertsComponent;
  @ViewChild('failBuyM') failBuyM!: ModalAlertsComponent;
  @ViewChild('otp') otp: any;
  selectedWallet!: string;
  membresias!: any[];
  user: any;
  message = '';
  currentMembership!: any;
  selectItem: any;
  validDate!: string
  balances: BalanceUserI[] = [];
  form = new FormGroup({});
  model: any = {};
  selectedPago: string='';
  selectedTipo: string='';
  fields: FormlyFieldConfig[] = [
    {
      key: 'walletId',
      className: 'w-100 mx-2',
      type: 'select',
      props: {
        label: 'Saldo',
        placeholder: 'Selecciona saldo',
        required: true,
        options: [],
      },
    },
  ];
  cupon: any;
  porcentaje: number=0;
  cuponId: any;
  cupo: boolean=false;
  valorM: any;
  saldo: number=0;
  pagar: boolean | undefined;
  statusCodigo: boolean | undefined;
  //data: BalanceUserI;
  botonDeshabilitado: boolean = true;

  // Método para habilitar el botón
 
  constructor(
    private userService: UserServiceService,
    private adminService: AdminServiceService,
    private router: Router,
    private financeServiceService: FinanceServiceService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    this.getBalance();
    this.getMembership();
    this.getCurrentMembership();
  }

  async getCurrentMembership() {
    try {
      const response = await lastValueFrom(this.userService.getCurrentMembership(this.user._id));

      if (response.data == null) {
        this.currentMembership = this.membresias.find((f: any) => f.code == 'BRONCE');
      } else {
        this.currentMembership = response.data;
        if(response.data.tiempo===1){
          this.validDate = moment(response.data.createdAt).add(1, 'months').format('LLLL');
        }
        if(response.data.tiempo===2){
          this.validDate = moment(response.data.createdAt).add(1, 'years').format('LLLL');
        }
      }
    } catch (error: any) {
      this.currentMembership = null;
    }
  }

  getBalance() {
    const user = sessionStorage.getItem('id')
    this.financeServiceService.getBalanceByUser(user!).subscribe(res => {
      this.balances = res.data;
      this.saldo=this.balances[0].balance;
      this.fields[0].props!.options = res.data.map((item: BalanceUserI) => {
        return {
          label: item.alias,
          value: item.walletId
        }
      })
     // console.log(this.fields);
    })
  }

  async getMembership() {
    try {
      const response = await lastValueFrom(this.userService.getAllMembership());

      if (response.data.length > 0) {
        let membership: any = [];
        response.data.map((item: any) => {
          if (item.state) {
            membership.push(item);
          }
        });
        //this.membresias = membership;
        this.membresias=response.data;
      }
    } catch (error: any) {
      this.membresias = [];
    }
  }

  setMembershipBuy(item: any) {
    this.selectItem = { ...item };
    this.valorM=this.selectItem.price;
   // this.verificarCupon();
  }

 async verificarCupon(){
  try {
    const response = await lastValueFrom(
      this.userService.getUserCupon(this.user._id)
    );
    if (response.data !== null) {
      this.cupon=response.data[0];
      this.porcentaje=this.cupon.cupon[0].porcentaje;  
      this.cuponId=this.cupon._id;   
    }
  } catch (error: any) {
    this.message = error.error.message;
    this.failBuyM.abrir();
  }
  
 }

 async onValidateCodigo(param: string) {
  try {
    const response = await lastValueFrom(
      this.adminService.validateCodigoCupo(param)
    );
    if (response.data.length>0) {
      this.statusCodigo =true;
      this.porcentaje=response.data[0].porcentaje;
      this.habilitarBoton();
    } else {
      this.statusCodigo = false
      this.porcentaje=0;
    }
  } catch (error: any) {
    console.log(error.error);
  }
}

  async onBuyMembership() {
    try {
      const response = await lastValueFrom(
        this.userService.buyMembership(this.user._id, this.selectItem._id,this.porcentaje,this.selectedTipo)
      );
      const descuento= this.porcentaje/100;
      const valDescuento=this.valorM*descuento;
      const totalPagar= this.valorM-valDescuento;
      const total=this.saldo-totalPagar;
      if (response.data !== null) {
        const resp1 = await lastValueFrom(
          this.adminService.updateBalance(this.balances[0]._id!,total)
        );
        if (resp1.data !== null) {        
          const msj = 'Tú membresía ha sido comprada';
              this.AlertaSucess(msj);
               setTimeout(() => {
                 window.location.reload();
               }, 5000);
            
            }
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failBuyM.abrir();
    }
  }

  onRedirigir() {
    location.reload();
  }

  AlertaSucess(msj: string) {
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }


  onSelectPago() {
    if(this.selectedPago==='1'){
      this.cupo=false;
      if(this.saldo >this.valorM){
        this.pagar=true;
        this.habilitarBoton();
      }    
      if(this.saldo <this.valorM){
        this.pagar=false;
      } 
    }
    if(this.selectedPago==='2'){
      this.pagar=true;
      this.deshabilitarBoton();
      this.cupo=true;            
    }
    if(this.selectedPago==='3'){
      this.cupo=false;
      this.pagar=false;
      
    }
    
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  onSelectTipo() {
    if(this.selectedTipo==='1'){
      this.valorM=this.selectItem.price
    }
    if(this.selectedTipo==='2'){
      this.valorM=(this.selectItem.price*12)-(this.selectItem.price*2)
    }
  }


  habilitarBoton() {
    this.botonDeshabilitado = false;
  }

  // Método para deshabilitar el botón
  deshabilitarBoton() {
    this.botonDeshabilitado = true;
  }
}
