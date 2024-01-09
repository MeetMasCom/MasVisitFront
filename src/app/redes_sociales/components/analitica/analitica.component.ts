import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent {
  id: string='';
  idMarca: any;
  token: any;
  marca:any=[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    public redesService: RedesSocialesService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
     
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idMarca = params['marca'];
        console.log(this.idMarca);
        this.getMarca();
      });
      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getMarca() {
    const resp = await lastValueFrom(
      this.redesService.getMarcaById(this.idMarca)
    );
    if (resp.data.length > 0) {
      this.marca = resp.data[0];
      console.log(this.marca);
    }
  }

  Conectar(){
    
  }
}
