import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { audit, elementAt, lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { DatePipe, Time } from '@angular/common';

import {
  fas,
  faMessage,
  faBell,
  faUserCheck,
  faImages,
  faVideo,
  faPhotoVideo,
  faFaceSmile,
  faHashtag,
  faComment,
  faFile,
  faLocationDot,
  faLink,
  
} from '@fortawesome/free-solid-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faTiktok,
  faPinterest,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faUserPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css'],
})
export class AddPublicationComponent {

  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  @ViewChild('canvasElement') canvasElement: ElementRef | undefined;
  videoDuration: number | undefined;

  videoThumbnail: string | ArrayBuffer | null = null;
  faImages = faImages;
  faVideo = faVideo;
  faPhotoVideo = faPhotoVideo;
  faFaceSmile = faFaceSmile;
  faHashtag = faHashtag;
  faComment = faComment;
  faFile = faFile;
  faLocation = faLocationDot;
  faLink = faLink;
  faElipsis = faEllipsis;
  id: string = '';
  token: any;
  //router: any;
  selectedIcons: string[] = [];

  emojiPickerVisible = false;
  idArchivo: string = '';

  @Input() mensaje: string = '';
  @Input() imagenUrl: string | undefined;
  @Input() videoUrl: string | undefined;

  contenidoTextarea: string = '';
  img64: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  titulo: string = '';
  idP: string = '';
  detail: any = [];
  iconName: string = 'facebook'; // Puedes cambiar esto dinámicamente
  icon!: IconDefinition;
  val: boolean = false;
  isComentarios: boolean = false;
  isDuos: boolean = false;
  isPegar: boolean = false;
  idMarca: any;
  marca: any = [];
  file: File | undefined;
  fechaHoraISO: string = '';
  emojiSet = 'google'; // Puedes cambiar esto según tus preferencias
  emojiSkin = 1; // Puedes cambiar esto según tus preferencias
  emojiSize = 24; // Puedes cambiar esto según tus preferencias
  selectedEmoji: any; // Puedes manejar el emoji seleccionado aquí
  configuracion: Array<Object>=[];
  tiktok: any = [];
  twitter: any = [];
  facebook: any = [];
  instagram: any = [];
  linkedin: any = [];
  pinterest: any = [];
  youtube: any = [];
  opcionFace:string='post';
  opcionInsta:string='post';
  opcionYoutube:string='video';
  tituloFace: any;
  opcionAudiencia:string='';
  opcionPrivacidad:string='';
  opcionCategoria:string='';
  tituloYoutube: string='';
  etiquetasYoutube: string='';
  selectedIcons1: string='';
  fechaActual: Date = new Date();
  image:boolean=false;
  video:boolean=false;
  sanitizer: any;
  publicarRedes: boolean = false; 
  
  location: string = '';
  // autocompleteResults: google.maps.places.AutocompletePrediction[] = [];

  ubicacion:boolean=false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    public redesService: RedesSocialesService,
    private datePipe: DatePipe,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faFacebook,
      faTwitter,
      faYoutube,
      faInstagram,
      faPinterest,
      faTiktok,
      faPinterest
    );
    //this.setIcon();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idP = params['detail'];
        if (this.idP === '' || this.idP === undefined) {
          this.titulo = 'Nueva Publicacion';
        } else {
          this.titulo = 'Modificar Publicación';
          this.getPublicationId();
        }
      });
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idMarca = params['marca'];
        this.getMarca();
      });
      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  Cancelar() {
    this.router.navigate(['/planning'], {
      queryParams: { marca: this.idMarca },
    });
  }

  onFileSelected(event: any) {
    this.image=false;
    this.video=false;
    this.imagenUrl='';
    this.videoUrl='';
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenUrl = e.target.result;
      };

      reader.onloadend = () => {
        this.img64 = reader.result as string;
        //console.log('Imagen en formato Base64:', this.img64);
        // Puedes hacer lo que quieras con la imagen en formato Base64
      };

      if (this.file.type.startsWith('image')) {
       this.image=true;
      } 
      // Verifica si es un video
      else if (this.file.type.startsWith('video')) {
        this.video=true;
        this.videoUrl= URL.createObjectURL(this.file);
         reader.onload = (e: any) => {
        //this.imagenUrl = e.target.result;
      };
        this.generateVideoThumbnail(this.file);
      
      } 

      //reader.readAsDataURL(this.imagenSeleccionada);

      reader.readAsDataURL(this.file);
    }
  }

  Eliminar(){
    this.file=undefined;
    this.imagenUrl='';
    this.videoUrl='';
    this.videoThumbnail='';
  }

  generateVideoThumbnail(file: File) {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);

    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.videoThumbnail = canvas.toDataURL('image/png'); // Puedes ajustar el formato de la imagen según tus necesidades
         console.log(this.videoThumbnail);
      }

      URL.revokeObjectURL(video.src); // Liberar recursos
    });
  }

  onVideoMetadata(event: any) {
    this.videoDuration = event.target.duration;
  }
  
  onDateSelected() {
    console.log('fecha', this.selectedDate);
  }

  onTimeSelected() {
    console.log('fecha', this.selectedTime);
  }

  onEmojiClick(event: any) {
    this.selectedEmoji = event.emoji;
    // Aquí puedes manejar el emoji seleccionado, por ejemplo, almacenarlo en una variable
  }

  async GuardarPublicacion() {      
    //this.guardarImagen();
    this.obtenerFecha();   
    this.ConfiguracionRedes();
    const resp2 = await lastValueFrom(
      this.redesService.createPublicacion(
        this.id,
        this.idMarca,
        this.contenidoTextarea,
        this.fechaHoraISO,
        this.configuracion,
        this.publicarRedes
      )
    );

    if (resp2 !== null) {
      this.router.navigate(['/planning'], {
        queryParams: { marca: this.idMarca },
      });
      location.reload();
    } else {
      console.log('error en el registro');
    }
  }

  //verifico si el usuario ingresa fecha, si no ingresa, manda la fecha actuak
  obtenerFecha() {
    if (this.selectedDate === '') {
      const f = new Date();
      this.selectedDate = this.datePipe.transform(f, 'shortDate')!;
    } else {
      const f = new Date(this.selectedDate);
      this.selectedDate = this.datePipe.transform(f, 'shortDate')!;
    }

    if (this.selectedTime === '') {
      const h = new Date();
      this.selectedTime = this.datePipe.transform(h, 'shortTime')!;
      const fechaHoraString = `${this.selectedDate} ${this.selectedTime}`;
      const fechaHora = new Date(fechaHoraString);
      this.fechaHoraISO = fechaHora.toISOString();
    } else {
      this.selectedTime = this.datePipe.transform(
        this.selectedDate,
        'shortTime'
      )!;
      const fechaHoraString = `${this.selectedDate} ${this.selectedTime}`;
      const fechaHora = new Date(fechaHoraString);
      this.fechaHoraISO = fechaHora.toISOString();
    }
  }

  valFace(){
    console.log(this.opcionFace);
  }

  valInsta(){
    console.log(this.opcionInsta);
  }

  //mando a guardar la imagen 
  async guardarImagen() {
    this.idArchivo='';
    if (this.file != undefined) {
      const resp1 = await lastValueFrom(
        this.redesService.saveImagen(this.file)
      );
      if (resp1 != null) {
        this.idArchivo = resp1.id;       
      }
    }
  }

  //agrego al objeto configuracion las opciones de cada red social

  async ConfiguracionRedes()
   {

    if (this.file != undefined) {
      const resp1 = await lastValueFrom(
        this.redesService.saveArchivo(this.file,this.id)
      );
      if (resp1 != null) {
        console.log("resp",resp1);
        this.idArchivo = resp1.id;       
      }
    }
    console.log('id', this.idArchivo);
     this.selectedIcons.forEach((element) => {
      // configuracion para tiktok
      if (element === 'tiktok') {        
        this.confTikTok();
      }

      //configuracion para facebook
      if(element==='facebook'){
       this.confFacebook();
      }

      //configuracion para twitter
      if (element === 'twitter') {        
        this.confTwitter();
      }
      //configuracion para youtube
      if(element=== 'youtube'){
        this.confYoutube();
      }
      //configuracion para pinterest
      if(element=== 'pinterest'){
        this.confPinterest();
      }
      //configuracion para linkedin
      if(element=== 'linkedin'){
        this.confLinkedin();
      }
      //configuracion para instagram
      if(element=== 'instagram'){
        this.confInstagram();
      }
    });
  }

confFacebook(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  if(this.opcionFace==='post'){
    this.facebook  = [{
      tipo:this.opcionFace,
      media:media,
      titulo:this.tituloFace
    }];
  }
  if(this.opcionFace==='real'){
    this.facebook  = [{
      tipo:this.opcionFace,
      media:media,
      titulo:this.tituloFace
    }];
  }
  else{
    this.facebook  = [{
      tipo:'historia',
      media:media
    }];
  }
  const ff={
    facebook:this.facebook
  }
  this.configuracion.push(ff);
}

confTikTok(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  this.tiktok = [{
    comentarios: this.isComentarios,
    duos: this.isDuos,
    pegar: this.isPegar,
    media:media
  }];
  const tt={
    tiktok:this.tiktok
  }
  this.configuracion.push(tt);
}

confTwitter(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  this.twitter = [{
    media:media
  }];
  const tw={
    twitter:this.twitter
  }
  this.configuracion.push(tw);
}

confYoutube(){
  const media:Array<Object>= [{
    tipo:'video',
    id_archivo: this.idArchivo,
  }];
  
  this.youtube  = [{
    tipo:this.opcionYoutube,
    media:media,
    titulo:this.tituloYoutube,
    audiencia:this.opcionAudiencia,
    categoria:this.opcionCategoria,
    publico:this.opcionPrivacidad,
    etiquetas:this.etiquetasYoutube,
  }];
  const yt={
    youtube:this.youtube
  }
  this.configuracion.push(yt);
}
confPinterest(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  this.twitter = [{
    media:media
  }];
  const tw={
    twitter:this.twitter
  }
  this.configuracion.push(tw)
}
confLinkedin(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  this.twitter = [{
    media:media
  }];
  const tw={
    twitter:this.twitter
  }
  this.configuracion.push(tw)
}
confInstagram(){
  const media:Array<Object>= [{
    tipo:'imagen',
    id_archivo: this.idArchivo,
  }];
  if(this.opcionInsta==='post'){
    this.instagram = [{
      tipo:this.opcionInsta,
      media:media,
      titulo:this.tituloFace
    }];
  }
  if(this.opcionInsta==='reel'){
    this.instagram  = [{
      tipo:this.opcionInsta,
      media:media,
      titulo:this.tituloFace
    }];
  }
  else{
    this.instagram  = [{
      tipo:'historia',
      media:media
    }];
  }
  const inst={
    instagram:this.instagram
  }
  this.configuracion.push(inst);
}

  toggleEmojiPicker() {
    this.emojiPickerVisible = !this.emojiPickerVisible;
  }

  addEmoji(event: any) {}

  async getPublicationId() {
    const resp = await lastValueFrom(
      this.redesService.getPublicationById(this.idP)
    );
    if (resp.data.length > 0) {
      this.detail = resp.data;
      console.log('detail', this.detail);
    }
  }

  handleClick(iconName: string) {
   
    const index = this.selectedIcons.indexOf(iconName);

    if (index === -1) {
      // Si no está, agrégalo
      this.selectedIcons.push(iconName);
    } else {
      // Si ya está, retíralo
      this.selectedIcons.splice(index, 1);
    }
    this.selectedIcons1=this.selectedIcons[0];
  }

  iconMappings: { [key: string]: IconDefinition } = {
    facebook: faFacebook,
    twitter: faTwitter,
    youtube: faYoutube,
    instagram: faInstagram,
    tiktok: faTiktok,
    linkedin: faLinkedin,
    pinterest: faPinterest,
    // Puedes agregar más iconos según sea necesario
  };

  setIcon(iconName: string) {
    this.icon = this.iconMappings[iconName] || this.getDefaultIcon();
  }

  getDefaultIcon(): IconDefinition {
    return faFacebook; // Cambia esto según tu icono predeterminado
  }

  validarRed(red: string): boolean {
    this.val = false;
    this.selectedIcons.forEach((element) => {
      if (red === element) {
        this.val = true;
      }
    });
    return this.val;
  }

  toggleButton() {
    this.isComentarios = !this.isComentarios;
  }
  toggleButton1() {
    this.isDuos = !this.isDuos;
  }
  toggleButton2() {
    this.isPegar = !this.isPegar;
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

  //previsualizar
  handleClick1(iconName: string) {
    const index = this.selectedIcons1.indexOf(iconName);
    this.selectedIcons1=iconName;
  }

  handleEmojiClick = (emoji: string) => {
    this.selectedEmoji = emoji;
  }


  Ubicacion(){
  this.ubicacion=true;
  }

  // searchLocations() {
  //   const autocompleteService = new google.maps.places.AutocompleteService();

  //   autocompleteService.getPlacePredictions(
  //     { input: this.location },
  //     (predictions, status) => {
  //       if (status == google.maps.places.PlacesServiceStatus.OK) {
  //         this.autocompleteResults = predictions || [];
  //       } else {
  //         console.error(status);
  //       }
  //     }
  //   );
  // }
}
