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
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {

  @ViewChild('updateProfile') updateProfile!: MmodalComponent;
  user_data: any;
  api: string='';
  id: string='';
  token: any;
  profileDetail: any;
  idProfile: any;
  dataProfile: any;

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
      this.getProfiles();
  

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/admin']);
    }   
  }

  async getProfiles() {
    const resp = await lastValueFrom(this.adminService.getAllProfiles());

    if (resp !== null) {
      this.dataProfile = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async detailAds(id:string){
     const resp = await lastValueFrom(this.adminService.getProfileById(id));
     if (resp !== null) {
       this.profileDetail = resp.data[0];      
       this.idProfile=this.profileDetail._id;
       this.updateProfile.abrir();
     } else {
      console.log('no se encontraron datos');
     }
  }


  async onRegisterProfile(form:any){
    const resp = await lastValueFrom(this.adminService.registerProfile(form));
    if (resp !== null) {
      location.reload();
    } else {
     console.log('no se encontraron datos');
    }
  }

  async updateProfileA(event:any){
    const resp = await lastValueFrom(this.adminService.updateProfile(this.idProfile,event));
    if (resp !== null) {
      location.reload();
    } else {
     console.log('no se encontraron datos');
    }
  }

  async disable(id:string){
    const state=1;
    const resp = await lastValueFrom(this.adminService.updateStateProfile(id,state));
    if (resp !== null) {
      location.reload();
    } else {
     console.log('no se encontraron datos');
    }
  }

  async enable(id:string){
    const state=0;
    const resp = await lastValueFrom(this.adminService.updateStateProfile(id,state));
    if (resp !== null) {
      location.reload();
    } else {
     console.log('no se encontraron datos');
    }
  }

}
