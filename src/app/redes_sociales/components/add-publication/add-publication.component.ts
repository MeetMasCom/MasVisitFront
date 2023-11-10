import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {
  id: string='';
  token: any;
  //router: any;

  @Input() mensaje: string = '';
  @Input() imagenUrl: string | undefined;
  
  contenidoTextarea: string = '';
  img64: string='';
  selectedDate: string='';
  selectedTime: string='';

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

  async GuardarPublicacion(){
    const resp = await lastValueFrom(
      this.redesService.createPublicacion(this.id,this.contenidoTextarea,this.img64,this.selectedDate,this.selectedTime)
    );

    if (resp !== null) {
      this.router.navigate(['/planning']);
    } else {
      console.log('error en el registro');
    }
  }
}
