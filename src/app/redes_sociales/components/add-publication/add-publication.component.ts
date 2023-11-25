import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
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
@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css'],
})
export class AddPublicationComponent {
  faImages = faImages;
  faVideo = faVideo;
  faPhotoVideo = faPhotoVideo;
  faFaceSmile = faFaceSmile;
  faHashtag = faHashtag;
  faComment = faComment;
  faFile = faFile;
  faLocation = faLocationDot;
  faLink = faLink;
  id: string = '';
  token: any;
  //router: any;
  selectedIcons: string[] = [];

  emojiPickerVisible = false;

  @Input() mensaje: string = '';
  @Input() imagenUrl: string | undefined;

  contenidoTextarea: string = '';
  img64: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  titulo: string = '';
  idP: string = '';
  detail: any = [];
  iconName: string = 'facebook'; // Puedes cambiar esto dinámicamente
  icon!: IconDefinition;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    public redesService: RedesSocialesService,
    private datePipe: DatePipe,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faFacebook, faTwitter, faYoutube,faInstagram,faPinterest,faTiktok,faPinterest);
    //this.setIcon();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idP = params['detail'];
        console.log('llega', this.idP);
        if (this.idP === '' || this.idP === undefined) {
          this.titulo = 'Nueva Publicacion';
        } else {
          this.titulo = 'Modificar Publicación';
          this.getPublicationId();
        }
      });
      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  Cancelar() {
    this.router.navigate(['/planning']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenUrl = e.target.result;
      };

      reader.onloadend = () => {
        this.img64 = reader.result as string;
        //console.log('Imagen en formato Base64:', this.img64);
        // Puedes hacer lo que quieras con la imagen en formato Base64
      };

      //reader.readAsDataURL(this.imagenSeleccionada);

      reader.readAsDataURL(file);
    }
  }

  async GuardarPublicacion() {
    if (this.selectedDate === '') {
      const f = new Date();
      this.selectedDate = this.datePipe.transform(f, 'shortDate')!;
    }
    if (this.selectedTime === '') {
      const h = new Date();
      this.selectedTime = this.datePipe.transform(h, 'shortTime')!;
    }
    const resp = await lastValueFrom(
      this.redesService.createPublicacion(
        this.id,
        this.contenidoTextarea,
        this.img64,
        this.selectedDate,
        this.selectedTime,
        this.selectedIcons
      )
    );

    if (resp !== null) {
      this.router.navigate(['/planning']);
    } else {
      console.log('error en el registro');
    }
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
    console.log('iconos', this.selectedIcons);
  }


  iconMappings: { [key: string]: IconDefinition } = {
    'facebook': faFacebook,
    'twitter': faTwitter,
    'youtube': faYoutube,
    'instagram': faInstagram,
    'tiktok': faTiktok,
    'linkedin': faLinkedin,
    'pinterest': faPinterest,
    // Puedes agregar más iconos según sea necesario
  };

  setIcon(iconName:string) {
    this.icon = this.iconMappings[iconName] || this.getDefaultIcon();
  }

  getDefaultIcon(): IconDefinition {
    return faFacebook; // Cambia esto según tu icono predeterminado
  }
}
