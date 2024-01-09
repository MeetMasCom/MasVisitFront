import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

  id: string='';
  token: any;
  idMarca: any;
  valInput: string='';
  private enlaces: Map<string, string> = new Map();
  idCorto: string='';
  fechaActual: string | undefined;
  inputs: string[] = ['']; // Puedes inicializar con un input vacío
  urls: string[] = ['']; // Puedes inicializar con un input vacío
  iconos: string[] = ['']; // Puedes inicializar con un input vacío
  urlsIcono: string[] = ['']; // Puedes inicializar con un input vacío
  @Output() valoresEmitted = new EventEmitter<
    { texto: string; url: string }[]
  >();

  fechaActual1: Date = new Date();
  fechaInicioSemana: Date | undefined;
  horaActual: string | undefined; // Nueva propiedad para la hora actual

  objetosArray: any[] = [
    { icono: 'facebook', nombre: 'Facebook' },
    { icono: 'instagram', nombre: 'Instagram' },
    { icono: 'tiktok', nombre: 'TikTok' },
    { icono: 'linkedin', nombre: 'LinkedIn' },
    { icono: 'pinterest', nombre: 'Pinterest' },
    { icono: 'youtube', nombre: 'Youtube' },
    { icono: 'twitter', nombre: 'Twitter' },
    // Puedes agregar más objetos con valores ya definidos
  ];
  detail: any[] = [];
  eventos: any[] = [];
  marca: any[] = [];
  link: any;
  linkId: any;
  

  items: any[]=[]; // Tu array de elementos a paginar
  p: number = 1; // Página actual
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    public redesService: RedesSocialesService
  ) {}
  
  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idMarca = params['marca'];
      });
      this.getLinkUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  acortarEnlace() {
    // Generar un identificador único (puedes usar un paquete como shortid o generar algo propio)
    this.idCorto = this.generarIdCorto();

    // Guardar la asociación entre el identificador corto y el enlace original
    this.enlaces.set(this.idCorto, this.valInput);

    // Devolver el enlace corto
    return this.idCorto;
  }

  obtenerEnlaceOriginal(idCorto: string): string | undefined {
    // Obtener el enlace original asociado con el identificador corto
    return this.enlaces.get(idCorto);
  }

  private generarIdCorto(): string {
    // Implementa la lógica para generar un identificador corto único (puedes usar shortid, generar aleatoriamente, etc.)
    // Aquí, por simplicidad, se está usando un código corto aleatorio de longitud fija
    const longitudCodigo = 6;
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let idCorto = '';

    for (let i = 0; i < longitudCodigo; i++) {
      const caracterAleatorio = caracteresPermitidos.charAt(Math.floor(Math.random() * caracteresPermitidos.length));
      idCorto += caracterAleatorio;
    }

    return idCorto;
  }

  abrirEnlace(){
    window.open(this.valInput, '_blank');
  }

  async GuardarLink(){
    const url="https://masvisit.com/"+this.idCorto;
      const resp = await lastValueFrom(
        this.redesService.createLink(
          this.id,
          this.idCorto,
          this.valInput,
          url
        )
      );
  
      if (resp !== null) {
        location.reload();

      } else {
        console.log('error en el registro');
      }
  }


    async getLinkUser(){
      const resp = await lastValueFrom(
        this.redesService.getLinkByIdUser(this.id)
      );
  
      if (resp.data !== null) {
        this.link=resp.data;
      } else {
        console.log('error en la recuperacion de datos');
      }
    }

    async abrir(id:string){
      const resp = await lastValueFrom(
        this.redesService.getLinkById(id)
      );
  
      if (resp.data !== null) {
        this.linkId=resp.data[0];
        
        const resp1= await lastValueFrom(this.redesService.updateLink(id));
        if(resp1.data!==null){
          window.open(this.linkId.link, '_blank');
          location.reload();
        }
      } else {
        console.log('error en la recuperacion de datos');
      }
     
    }

  agregarInput() {
    this.inputs.push('');
    
    this.urls.push('');
  }

  agregarIcono() {
    this.iconos.push('');
    this.urlsIcono.push('');
  }

  guardarBotones() {
    // // Crea un array con los valores de texto y url
    // const valores: { texto: string; url: string }[] = [];

    // for (let i = 0; i < this.inputs.length; i++) {
    //   valores.push({ texto: this.inputs[i], url: this.urls[i] });
    // }

    // // Llama a la función que manejará los valores (puedes ajustar esto según tus necesidades)
    // console.log("botones",valores);
  }

  guardarIconos() {}
  trackByIndex(index: number, obj: any): any {
    return index;
 }

 onTableDataChange(event: any) {
  this.page = event;
  this.getLinkUser();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getLinkUser();
}
}
