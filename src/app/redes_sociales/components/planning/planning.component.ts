import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { FormsModule } from '@angular/forms';
import {
  parseISO,
  isWithinInterval,
  addHours,
  isSameDay,
  isBefore,
} from 'date-fns';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent {
  fechasSemana: string[] = [];
  horas: string[] = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];
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
  
  id: string = '';
  token: any;
  idMarca: any;

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
        this.getMarca();
      });

    } else {
      this.router.navigate(['/inicio']);
    }
    this.getPublicaciones();
    this.calcularInicioSemana();
    this.generarFechasSemana();
    this.fechaActual = moment().format('YYYY-MM-DD');
    this.actualizarHoraActual();
  }

  actualizarHoraActual(): void {
    this.horaActual = moment().format('HH:mm');
  }
  AddPublication() {
    this.router.navigate(['/addPublication'],{ queryParams: { marca: this.idMarca } });
  }



  Analitica(){
    this.router.navigate(['/analitica'],{ queryParams: { marca: this.idMarca } });
  }

  calcularInicioSemana(): void {
    this.fechaInicioSemana = moment(this.fechaActual1).startOf('week').toDate();
  }

  avanzarSemana(): void {
    this.fechaActual1.setDate(this.fechaActual1.getDate() + 7);
    this.calcularInicioSemana();
    this.generarFechasSemana();
  }

  retrocederSemana(): void {
    this.fechaActual1.setDate(this.fechaActual1.getDate() - 7);
    this.calcularInicioSemana();
    this.generarFechasSemana();
  }
  generarFechasSemana(): void {
    this.fechasSemana = [];
    for (let i = 0; i < 7; i++) {
      const fecha = moment(this.fechaInicioSemana)
        .add(i, 'days')
        .format('YYYY-MM-DD');
      this.fechasSemana.push(fecha);
    }
  }

  esFechaActual(fecha: string): boolean {
    return fecha === this.fechaActual;
  }

  publicar(hora: string, fecha: string) {
    const url = `https://tuurl.com?hora=${hora}&fecha=${fecha}`; // Reemplaza con tu URL
    this.router.navigate(['/addPublication']);
  }

  esMismaFechaYHora(
    eventFechaHora: string,
    cellDate: string,
    cellHour: string
  ): boolean {
    const eventDateTime = new Date(eventFechaHora);
    const cellDateTime = new Date(cellDate + ' ' + cellHour);
    // Calcula la próxima hora
    const proximaHora = new Date(eventFechaHora);
    proximaHora.setHours(proximaHora.getHours() + 1);
    proximaHora.setMinutes(0);
    proximaHora.setSeconds(0);

    return (
      eventDateTime.getFullYear() === cellDateTime.getFullYear() &&
      eventDateTime.getMonth() === cellDateTime.getMonth() &&
      eventDateTime.getDate() === cellDateTime.getDate() &&
      eventDateTime.getHours() === cellDateTime.getHours()
    );
  }

  agregarInput() {
    this.inputs.push
    
    this.urls.push('');
  }

  agregarIcono() {
    this.iconos.push('');
    this.urlsIcono.push('');
  }

  trackByIndex(index: number, obj: any): any {
    return index;
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

  onInputChange(event: Event, index: number): void {
    if (event.target) {
      this.inputs[index] = (event.target as HTMLInputElement).value;
    }
  }
  

  guardarIconos() {}


  async getPublicaciones() {
    const resp = await lastValueFrom(
      this.redesService.getPublicaciones(this.id,this.idMarca)
    );
    if (resp.data.length > 0) {
      this.eventos = resp.data;
      console.log("publicaciones",this.eventos);
    }
  }


  async getMarca() {
    const resp = await lastValueFrom(
      this.redesService.getMarcaById(this.idMarca)
    );
    if (resp.data.length > 0) {
      this.marca = resp.data;
      console.log(this.marca);
    }
  }

  async detailPublication(id:string){
      this.router.navigate(['/addPublication'],{ queryParams: { detail: id } });    
  }
}
