import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BilleteraServiceService } from '../../service/billetera-service.service';
import { Router } from '@angular/router';
import { BilleteraUserI } from '../../interfaces/billetera';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-billetera-e',
  templateUrl: './update-billetera-e.component.html',
  styleUrls: ['./update-billetera-e.component.css']
})
export class UpdateBilleteraEComponent {
  id: string = '';
  detalleB: string = '';
  direccionB: string = '';
  tagB: string = '';
  urlB: string = '';
  costoB: number = 0;
  saldoMinimoB: number = 0;
  minimoB: number = 0;
  maximoRetiroBB: number = 0;
  maximoRetiroPB: number = 0;
  maximoRetiroOB: number = 0;
  maximoRetiroDB: number = 0;
  minimoProfitB: number = 0;
  maximoProfitBB: number = 0;
  maximoProfitPB: number = 0;
  maximoProfitOB: number = 0;
  maximoProfitDB: number = 0;
  aliasB: string = '';
  tipoB: string = '';
  estado!: number;
  msj: string = '';
  id_billetera:string='';
  constructor(
    private billeteraService: BilleteraServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    } 
    
    if (this.id != null) {
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_billetera = params['id'];
        console.log("id billetera", this.id_billetera);
      });
    } else {
      this.router.navigate(['/inicio']);
    }
    


    const resp = await lastValueFrom(this.billeteraService.getBilleteraId(this.id_billetera));
    console.log(resp.data);
    if (resp?.data.length > 0) {
      this.detalleB = resp.data[0].detalle;
      
          this.tipoB = resp.data[0].tipo;
          this.direccionB = resp.data[0].dir;
          this.tagB = resp.data[0].tag;
          this.aliasB = resp.data[0].alias;
          this.costoB = resp.data[0].costo.$numberDecimal;
          this.saldoMinimoB = resp.data[0].minimoSaldo.$numberDecimal;
          this.minimoB = resp.data[0].minimo.$numberDecimal;
          this.maximoRetiroBB = resp.data[0].maximoRetiroB.$numberDecimal;
          this.maximoRetiroPB = resp.data[0].maximoRetiroP.$numberDecimal;
          this.maximoRetiroOB = resp.data[0].maximoRetiroO.$numberDecimal;
          this.maximoRetiroDB = resp.data[0].maximoRetiroD.$numberDecimal;
          if (resp.data[0].minimoProfit) {
            this.minimoProfitB = resp.data[0].minimoProfit.$numberDecimal;
          }
          if (resp.data[0].maximoProfitB) {
            this.maximoProfitBB = resp.data[0].maximoProfitB.$numberDecimal;
          }
          if (resp.data[0].maximoProfitP) {
            this.maximoProfitPB = resp.data[0].maximoProfitP.$numberDecimal;
          }
          if (resp.data[0].maximoProfitO) {
            this.maximoProfitOB = resp.data[0].maximoProfitO.$numberDecimal;
          }
          if (resp.data[0].maximoProfitD) {
            this.maximoProfitDB = resp.data[0].maximoProfitD.$numberDecimal;
          }
    }
    else
    {
      location.href = '/inicio';
    }
      
  }

  onUpdate(form: any) {
    if (form.value.costo == '') {
      form.value.costo = this.costoB;
    }
    if (form.value.detalle == '') {
      form.value.detalle = this.detalleB;
    }
    if (form.value.direccion == '') {
      form.value.direccion = this.direccionB;
    }
    if (form.value.tag == '') {
      form.value.tag = this.tagB;
    }
    if (form.value.maximoProfitB == '') {
      form.value.maximoProfitB = this.maximoProfitBB;
    }
    if (form.value.maximoProfitD == '') {
      form.value.maximoProfitD = this.maximoProfitDB;
    }
    if (form.value.maximoProfitP == '') {
      form.value.maximoProfitP = this.maximoProfitPB;
    }
    if (form.value.maximoProfitO == '') {
      form.value.maximoProfitO = this.maximoProfitOB;
    }
    if (form.value.maxretiroB == '') {
      form.value.maxretiroB = this.maximoRetiroBB;
    }
    if (form.value.maxretiroD == '') {
      form.value.maxretiroD = this.maximoRetiroDB;
    }
    if (form.value.maxretiroO == '') {
      form.value.maxretiroO = this.maximoRetiroOB;
    }
    if (form.value.maxretiroP == '') {
      form.value.maxretiroP = this.maximoRetiroPB;
    }
    if (form.value.minimo == '') {
      form.value.minimo = this.minimoB;
    }
    if (form.value.minimoProfit == '') {
      form.value.minimoProfit = this.minimoProfitB;
    }
    if (form.value.minsaldo == '') {
      form.value.minsaldo = this.saldoMinimoB;
    }
    form.value.id = this.id;

    this.billeteraService.updateBilleteraEmpresaEstado(this.id_billetera,form.value).subscribe((data) => {
      if (data != null) {
        this.estado = 1;
        this.msj = 'Datos actualizados';
        setTimeout("location.href='/billeteraE'", 1000);
      } else {
        this.estado = 0;
        this.msj = 'Ah ocurrido un error inesperado, vuelva a intentarlo';
      }
    });
  }
}
