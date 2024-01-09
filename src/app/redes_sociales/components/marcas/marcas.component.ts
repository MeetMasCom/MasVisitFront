import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {
  id: string='';
  token: any;
  error: unknown;
  errMsj: any;
  marcas: any=[];
  detailM: any;
  @ViewChild('updateMar') updateMar!: MmodalComponent;
  idMarca: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    public redesService: RedesSocialesService,
    private toastr: ToastrService
  ) {
   
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;    
      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
      this.getMarcaByUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  AlertaSucess(msj:string) {
    this.toastr.success(msj, 'Éxito',{ timeOut: 4000 });
  }

  AlertaFail(msj:string) {
    this.toastr.error(msj, 'Error',{ timeOut: 4000 });
  }
  
  async onRegisterMarca(form:any){
    try{
      const resp = await lastValueFrom(
        this.redesService.createMarca(this.id,form)
      );
      if (resp.data!= null) {
        const msj='Marca registrada correctamente';
          this.AlertaSucess(msj);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
      }
    }
    catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      this.AlertaFail(this.errMsj);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
    }
}

async getMarcaByUser(){
  try{
    const resp = await lastValueFrom(
      this.redesService.getMarcaByUser(this.id)
    );
    if (resp.data!= null) {
      this.marcas=resp.data;
    }
  }
  catch (error: any) {
    console.log('error', error.error);
    this.errMsj = error.error.message;
    this.AlertaFail(this.errMsj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
  }
}

async detailMarca(id:string){
  try{
    const resp = await lastValueFrom(
      this.redesService.getMarcaById(id)
    );
    if (resp.data!= null) {
      this.detailM=resp.data[0];
      this.idMarca=this.detailM._id;
      console.log("detalle",this.detailM);
      this.updateMar.abrir();
    }
  }
  catch (error: any) {
    console.log('error', error.error);
    this.errMsj = error.error.message;
    this.AlertaFail(this.errMsj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
  }
}

async productos(id:string){
  this.router.navigate(['/planning'],{ queryParams: { marca: id } });
}

  async updateMarca(event:any){
  try{
    const resp = await lastValueFrom(
      this.redesService.updateMarca(this.idMarca,event)
    );
    if (resp.data!= null) {
      const msj='La Marca ha sido actualizada';
          this.AlertaSucess(msj);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
    }
  }
  catch (error: any) {
    console.log('error', error.error);
    this.errMsj = error.error.message;
    this.AlertaFail(this.errMsj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
  }
}

}
