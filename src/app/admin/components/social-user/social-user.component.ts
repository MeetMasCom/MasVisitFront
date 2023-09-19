import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminServiceService } from '../../services/admin-service.service';
import { ProfileServiceService } from '../../../profile/service/profile-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-user',
  templateUrl: './social-user.component.html',
  styleUrls: ['./social-user.component.css']
})
export class SocialUserComponent {
  user_data: any;
  api: string='';
  id: string='';
  token: any;
  dataUsers: any;

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private profileService: ProfileServiceService,
    private router: Router,
    public constante: ConstantsSystem,
    private http: HttpClient,
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getUsers();
  

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/admin']);
    }   
  }

  async getUsers() {
    const resp = await lastValueFrom(this.adminService.getUserSocials());

    if (resp !== null) {
      this.dataUsers = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

}
