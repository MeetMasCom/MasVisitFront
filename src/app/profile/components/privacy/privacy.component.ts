import { Component, NgModule, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileServiceService } from '../../service/profile-service.service';
import { FriendsServiceService } from '../../../friends/services/friends-service.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { UserServiceService } from '../../../user/services/user-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent {
  api: string = '';
  id: string = '';
  spam: any;
  statusUserName: boolean = false;
  userSpam: any;
  idSpam: any;
  dataUser: any;
  userName: any;
  lastName: any;

  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private userService: UserServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private clipboardService: ClipboardService,
    private toastr: ToastrService,
    private authServiceService: AuthServiceService,
    private userServiceService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getSpamUser();
      this.getUser() ;
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getSpamUser() {
    const resp = await lastValueFrom(this.profileService.getSpamUser(this.id));
    if (resp?.data.length > 0) {
      this.spam = resp.data;
    }
  }

  async onValidateUserName(param: string) {
    try {
      const response = await lastValueFrom(
        this.profileService.validateUserEmail(param)
      );
      if (response.data !== null) {
        this.userSpam = response.data;
        this.idSpam = this.userSpam._id;
        this.userName = this.userSpam.firstname;
        this.lastName = this.userSpam.lastname;
        this.statusUserName = false;

      } else {
        this.statusUserName = true;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }

  async onRegisterSpam(form: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.registerSpam(this.id, form, this.idSpam)
      );
      if (resp.data !== null) {
        this.router.navigate(['/privacy']);
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];

      }
    }



  getVerify() {
   
    let valid: boolean = false;
    const user: any = JSON.parse(sessionStorage.getItem('data')!);
    if (this.dataUser) {
      valid = this.dataUser.socialAgreements ?? false;
    }
    return valid;
  }

  async onSubmit() {
    const resp = await lastValueFrom(
      this.profileService.updateSocialAgreements(this.id)
    );
    if(resp.data){
this.updateInfoUser();
location.reload();
    }
    
  }

  updateInfoUser() {
    const user: any = sessionStorage.getItem('id');
    this.userServiceService.getInfoUser(user!).subscribe((res) => {
      sessionStorage.setItem('data', JSON.stringify(res.data));
    });
  }

  onCopy() {
    this.clipboardService.copy(this.getUrl());
    this.toastr.success('Texto copiado', 'Aviso');
  }

  getUrl() {
    const sponsor = sessionStorage.getItem('user');
    return (
      window.location.protocol +
      '//' +
      window.location.host +
      '/registro/' +
      sponsor
    );
  }
}
