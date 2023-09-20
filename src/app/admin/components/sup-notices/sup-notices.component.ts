import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AdminServiceService } from '../../services/admin-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { HttpClient } from '@angular/common/http';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-sup-notices',
  templateUrl: './sup-notices.component.html',
  styleUrls: ['./sup-notices.component.css']
})
export class SupNoticesComponent implements OnInit {

  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;

  @ViewChild('updatePackage') updatePackage!: MmodalComponent;
  dataAds: AdsI[] = [];
  selectedAds!: AdsI;
  detalleAds: any;
  allPackage: any;
  packageDetail: any;
  idPackage: any;
  idAds: any;
  user_data: any;
  api: string = '';
  id: string = '';
  message: string = "";

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private router: Router,
    public constante: ConstantsSystem,
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getAds();
      this.getPackage();
    } else {
      this.router.navigate(['/admin']);
    }
  }

  async getAds() {
    const resp = await lastValueFrom(this.adminService.getAllAds());
    if (resp !== null) {
      this.dataAds = resp.data;
    } else {
      this.dataAds = [];
    }
  }

  async detailAds(ads: AdsI) {
    this.selectedAds = { ...ads };
  }

  async declineAds(event: any) {
    try {
      const state = 2;
      const notify = 'Tú anuncio de publicidad fue devuelto';
      const response = await lastValueFrom(this.adminService.updateStateAds(event._id!, state, event.comentary!));
      this.message = response.message;
      await lastValueFrom(this.adminService.addNotification(this.id, event.userId, notify));
      this.successCreateM.abrir();
    } catch (error: any) {
      this.message = error.error.message;
      this.failCreateM.abrir();
    }
  }

  async acceptAds(event: AdsI) {
    try {
      const state = 0;
      const notify = 'Tú anuncio de publicidad fue aprobado';
      const response = await lastValueFrom(this.adminService.updateStateAds(event._id!, state, event.comentary!));
      this.message = response.message;
      await lastValueFrom(this.adminService.addNotification(this.id, event.userId, notify));
      this.successCreateM.abrir();
    } catch (error: any) {
      this.message = error.error.message;
      this.failCreateM.abrir();
    }
  }


  async getPackage() {
    const resp = await lastValueFrom(this.adminService.getAllPackage());
    if (resp !== null) {
      this.allPackage = resp.data;
    } else {
      this.allPackage = [];
    }
  }

  async onRegisterPackage(form: any) {
    const resp = await lastValueFrom(this.adminService.registerPaqueteAds(form));
    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }


  async disablePackage(id: string) {
    const state = 1;
    const resp = await lastValueFrom(this.adminService.updateStatePackage(id, state));
    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }

  }

  async detailPackage(id: string) {
    const state = 1;
    const resp = await lastValueFrom(this.adminService.getPackageById(id));
    if (resp !== null) {
      this.packageDetail = resp.data[0];
      this.idPackage = this.packageDetail._id;
      this.updatePackage.abrir();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async updatePackageAds(event: any) {
    const state = 1;
    const resp = await lastValueFrom(this.adminService.updatePackage(this.idPackage, event));
    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

}
