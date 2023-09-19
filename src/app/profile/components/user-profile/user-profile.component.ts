import { Component, ViewChild } from '@angular/core';
import { Observable, lastValueFrom, of, retryWhen } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ProfileServiceService } from '../../service/profile-service.service';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { FriendsServiceService } from 'src/app/friends/services/friends-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import {
  faCircleCheck,
  faCircleXmark,
  faLocationDot,
  faCakeCandles,
  faPeopleArrows,
  faCalendar,
  faUser,
  faAsterisk,
  faCircleArrowRight,
  faFileSignature,
  faLanguage,
  faGraduationCap,
  faBriefcase,
  faLaptopFile,
  faWeightScale,
  faLineChart,
  faUserPlus,
  faHandsPraying,
  faPerson,
  faEye,
  faChild,
  faClockFour,
  faPlateWheat,
  faMedal,
  faPersonWalking,
  faSmoking,
  faMartiniGlass,
  faChildren,
  faShirt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  @ViewChild('postdetail') postdetail!: MmodalComponent;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faLocationDot = faLocationDot;
  faCakeCandles = faCakeCandles;
  faPeopleArrows = faPeopleArrows;
  faUser = faUser;
  faCalendar = faCalendar;
  faAsterisk = faAsterisk;
  faCircleArrowRight= faCircleArrowRight;
  faLanguage=faLanguage;
  faGraduationCap=faGraduationCap;
  faBriefcase=faBriefcase;
  faLaptopFile=faLaptopFile;
  faWeightScale=faWeightScale;
  faLineChart=faLineChart;
  faUserPlus=faUserPlus;
  faHandsPraying=faHandsPraying;
  faPerson=faPerson;
  faEye=faEye;
  faChild=faChild;
  faClockFour=faClockFour;
  faPlateWheat=faPlateWheat;
  faMedal=faMedal;
  faPersonWalking=faPersonWalking;
  faSmoking=faSmoking;
  faMartiniGlass=faMartiniGlass;
  faChildren=faChildren;
  faShirt=faShirt;
  photoSelected: any;
  classA: string = '';
  message: string = '';
  api: string = '';
  id: string = '';
  id_user: string = '';
  img: string = '';
  dataUser: any;
  Post: any = [];
  imageBase64: string = '';
  file!: File;
  profile: any;
  PostD: any;
  errorMatch: any;
  seguidor: boolean = false;
  val: boolean = false;
  b: boolean = false;
  likes: number = 0;
  ban: number = 0;
  estado: any;
  data: any = [];
  user: string = '';

  miObservable$: Observable<boolean> | undefined;
  newPost: any;

  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private adminService: AdminServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('data')!) {
      this.data = sessionStorage.getItem('data')!;      
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.queryParams.subscribe(async (params) => {
        this.id_user = params['param1'];
        this.profile = params['param2'];
        if (!this.profile) {
          this.profile = '646c1e9ec29b09413fcb3887';
        }
        if (this.id === this.id_user) {
          this.router.navigate(['/myProfile']);
        }
        this.getUser();
        this.getPostUser();
        this.getPostUserProfile();
        this.VerificarLike();
        this.album();
      });
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(
      this.profileService.getUserById(this.id_user)
    );

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img = this.dataUser.image;
      this.imageBase64 = 'data:image/png;base64,' + '' + this.img; // Aquí colocas tu cadena Base64
      this.estado = this.dataUser.state[this.dataUser.state.length - 1];
    }
  }

  async getPostUserProfile() {
    const resp = await lastValueFrom(
      this.profileService.getPostUserProfileId(this.id_user, this.profile)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async selectedPost(id: string) {
    const resp = await lastValueFrom(this.friendsService.getPostById(id));

    if (resp?.data.length > 0) {
      this.PostD = resp?.data[0];
    }
    this.postdetail.abrir();
  }

  //Agregar seguidor
  async addLike(idUserLike: string, val: boolean) {
    try {
      const resp = await lastValueFrom(
        this.profileService.addLike(this.id, idUserLike, val)
      );
      if (resp !== null) {
        const message = 'Empezo a seguirte';
        const resp1 = await lastValueFrom(
          this.adminService.addNotification(this.id, idUserLike, message)
        );
        if (resp1 !== null) {
          location.reload();
        }
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errorMatch.abrir();
    }
  }

  //verificar seguidor
  async VerificarLike() {
    try {
      const resp = await lastValueFrom(
        this.profileService.verificarLike(this.id, this.id_user)
      );
      if (resp.data.length > 0) {
        this.seguidor = true;
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errorMatch.abrir();
    }
  }

  async addLikePost(post_id: string, userpost: string, val: boolean) {
    try {
      const resp = await lastValueFrom(
        this.profileService.addLikePost(post_id, this.id, val)
      );
      if (resp !== null) {
        const message = 'Le dio like a tú publicación';
        const resp1 = await lastValueFrom(
          this.adminService.addNotification(this.id, userpost, message)
        );
        if (resp1 !== null) {
          location.reload();
        }
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errorMatch.abrir();
    }
  }

  async getPostUser() {
    this.val = false;
    const resp = await lastValueFrom(
      this.profileService.getPostByIdUser(this.id_user)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
      this.Post.forEach(async (element: any, index: any) => {
        if (await this.likeUserPost(element._id)) {
          element.like = true;
         
        } else {
          element.like = false;
        }
        if (await this.countLikePost(element._id)) {
          element.count = this.likes;
        } else {
          element.count = 0;
        }
      });
    } else {
      console.log('no se encontraron datos');
    }
  }

  async likeUserPost(post_id: string): Promise<boolean> {
    try {
      const resp = await lastValueFrom(
        this.profileService.getLikePostUser(post_id, this.id)
      );
      if (resp.data.length > 0) {
        this.b = true;
        return this.b;
      } else {
        this.b = false;
        return this.b;
      }
    } catch (error: any) {
      console.log('error', error.error);
      return this.b;
    }
  }

  async deleteLikePost(post_id: string, userpost: string, val: boolean) {
    try {
      const resp = await lastValueFrom(
        this.profileService.deleteLikePost(post_id, this.id)
      );
      if (resp !== null) {
        location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errorMatch.abrir();
    }
  }

  async countLikePost(post_id: string): Promise<number> {
    try {
      this.likes = 0;
      const resp = await lastValueFrom(
        this.profileService.countLikePost(post_id)
      );
      if (resp.data !== null) {
        this.likes = resp.data;
        return this.likes;
      }
      if (resp.data !== null) {
        this.likes = 0;
        return this.likes;
      }
      return this.likes;
    } catch (error: any) {
      console.log('error', error.error);
      return this.likes;
    }
  }

  calcularEdad(fechaN: string): number {
    const hoy = new Date();
    const fechaNacimiento = new Date(fechaN);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  }

  album() {
    this.ban = 0;
    if (this.ban === 0) {
      this.getUser();
    }
  }

  detalle() {
    this.ban = 1;
  }

}
