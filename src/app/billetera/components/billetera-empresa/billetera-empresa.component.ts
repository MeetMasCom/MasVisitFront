import { Component } from '@angular/core';
import { BilleteraServiceService } from '../../service/billetera-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-billetera-empresa',
  templateUrl: './billetera-empresa.component.html',
  styleUrls: ['./billetera-empresa.component.css'],
})
export class BilleteraEmpresaComponent {
  estado!: number;
  billeteraEmpresa :any= [];
  status: string = '';
  tipo: any;
  searchText: any;
  l: any;
  id:any;

  constructor(
    private router: Router,
    private billeteraService: BilleteraServiceService,
    public constante: ConstantsSystem,
    private http: HttpClient
  ) {}


  
  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
     this.getBilleteras();
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  async getBilleteras() {
    this.billeteraService.getAllBilletera().subscribe((res) => {
      if (res != null) {
        this.billeteraEmpresa = res.data;
        console.log(this.billeteraEmpresa);
      }
    });
  }

  async onRegisterBilleteraEmpresa(form: any) {
    try {
      if (!form.value.alias) {
        form.value.alias = form.value.detalle;
      }
      if (!form.value.sigla) {
        form.value.sigla = form.value.detalle;
      }


      const response = await lastValueFrom(this.billeteraService.registerBilleteraEmpresa(form.value));
      if (response.data !== null) {
        location.reload();
      }else{
        this.estado = 3;
            location.reload();
      }

      form.reset();
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  getSelectedTipo() {
    this.status = this.tipo;
  }


  async onUpdateBilleteraEmpresa(form: any, id: any, estado: any) {
    const id_billetera = id;
    if(estado===1){
      form.value.estado = 0;
    } 
    if(estado===0)
    {
      form.value.estado = 1;
    }   

    const response = await lastValueFrom(this.billeteraService.updateBilleteraEmpresaEstado(id_billetera,form.value));
    if (response.data !== null) {
      location.reload();
    }else{
      this.estado = 0;
          location.reload();
    }


  }

  ir(id: any) {
    this.router.navigate(['/updateBilletera', id]);
  }
}
