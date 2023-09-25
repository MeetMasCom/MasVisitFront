import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminServiceService } from '../../services/admin-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent {

  @ViewChild('updateApiR') updateApiR!: MmodalComponent;

  dropdownSettings: IDropdownSettings = {};
  rolList: any = [];
  selectedRol: any = [];
  dataApis: any;
  apiDetail: any;
  idApi: any;

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
   
    this.getApis();
  }


  async onRegisterApi(form: any) {
    const resp = await lastValueFrom(
      this.adminService.createApi(form)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('error en el registro');
    }
  }

  async getApis() {
    const resp = await lastValueFrom(this.adminService.getApis());

    if (resp !== null) {
      this.dataApis= resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async enable(id: string) {
    const state = 0;
    const resp = await lastValueFrom(
      this.adminService.updateStateApi(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async disable(id: string) {
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.updateStateApi(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async detailApi(id: string) {
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.getApiById(id)
    );

    if (resp !== null) {
      this.apiDetail=resp.data[0];
      this.idApi=this.apiDetail._id;
      this.updateApiR.abrir();
    } else {
      console.log('no se encontraron datos');
    }
  }


  async updateApi(event:any){
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.updateApi(this.idApi,event)
    );

    if (resp !== null) {
     location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }
  
}
