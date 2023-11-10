import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { FriendsServiceService } from 'src/app/friends/services/friends-service.service';
import { ProfileServiceService } from 'src/app/profile/service/profile-service.service';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { ConstantsSystem } from 'src/app/utils/constants-system';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent {

  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('postModal') postModal!: MmodalComponent;
  @ViewChild('updateProfile') updateProfile!: MmodalComponent;
  @ViewChild('addProfile') addProfile!: MmodalComponent;
  @ViewChild('mperfil') mperfil!: MmodalComponent;
  @ViewChild('postdetail') postdetail!: MmodalComponent;


  @ViewChild('selectElement') selectElement: any;
  @ViewChild('errorMatch') errorMatch!: MmodalComponent;
  photoSelected: any;
  classA: string = '';
  message: string = '';
  api: string = '';
  id: string = '';
  img: string = '';
  image: string = '';
  dataUser: any;
  Post: any = [];
  imageBase64: string = '';
  file!: File;
  token: any;
  profile: any;
  myProfile: any;
  perfil: any[] = [];
  valorSeleccionado: string = '';
  val: string = '646c1e9ec29b09413fcb3887';
  count: number = 0;
  PostD: any;
  user_data: any;
  state: number=0;
  followers:number=0;
  followings:number=0;
  notification: any;
  myLikes: any;
  LikesUser: any;
  cMyLike=0;
  cLikeUser=0;
 valPerfil: any = [];
 ban: number = 0;
 estado: number=0;
 public Editor = ClassicEditor;
 public editorContent = '';
 private selectedImage: File | null = null;
 selecImage: string='';
 redes:number=0;
 statusUserName:boolean=false;
  stateUser: any;
  totalUser: number=0;
  starPromedio: number=0;
  starPost: any;
  
  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private userService: AuthServiceService,
    library: FaIconLibrary,
   
  ) {}

  ngOnInit(): void {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
     
      this.getPostUser();
    
      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  cargarImagen(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);

      const reader1 = new FileReader();
      reader1.readAsDataURL(this.file);
      reader1.onload = () => {
        const base64String = reader1.result!.toString().split(',')[1];
        const pureBase64 = base64String.replace(/[^a-zA-Z0-9+/]/g, '');
        this.image = pureBase64;
      };

      if (this.selectedImage) {
        // Lógica de carga de imagen aquí
        const imageUrl = URL.createObjectURL(this.selectedImage);
        this.editorContent += `<img src="${imageUrl}" alt="Image">`;
      }
      if(this.valorSeleccionado ==='Personal'){
        this.readImageFile(this.file);
      }
    } else {
      console.log('seleccione una foto');
    }
  }

  readImageFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selecImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async registerPost(event: any) {
    // try {
    //   const text = this.editorContent.replace(/<[^>]*>/g, '');
    //   const resp = await lastValueFrom(
    //     this.profileService.registrarPost(
    //       this.id,
    //       event.value,
    //       text,
    //       this.image,
          
    //     )
    //   );
    //   this.classA = 'alert-success';
    //   this.message = resp.message;
    //   this.correctModal.abrir();
    // } catch (error: any) {
    //   this.message = error.error.message;
    //   this.errorModal.abrir();
    // }
  }

  
  async getPostUser() {
  
    const resp = await lastValueFrom(
      this.profileService.getProfileUserPost(this.id)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } 
  }

}
