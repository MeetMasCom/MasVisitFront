import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-admin-membership',
  templateUrl: './admin-membership.component.html',
  styleUrls: ['./admin-membership.component.css'],
})
export class AdminMembershipComponent implements OnInit {
  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;
  @ViewChild('modalUpdateM') modalUpdateM!: ModalAlertsComponent;
  @ViewChild('successUpdateM')
  successUpdateM!: ModalAlertsComponent;
  @ViewChild('failUpdateM')
  failUpdateM!: ModalAlertsComponent;
  @ViewChild('infoDeleteM')
  infoDeleteM!: ModalAlertsComponent;
  @ViewChild('successDeleteM')
  successDeleteM!: ModalAlertsComponent;
  @ViewChild('failDeleteM')
  failDeleteM!: ModalAlertsComponent;

  message = '';
  membresias: any = [];
  item: any = [];
  idItem = '';

  constructor(private adminService: AdminServiceService) {}

  async ngOnInit() {
    await this.getMembership();
  }

  async onRegisterMembership(form: any) {
    try {
      const response = await lastValueFrom(
        this.adminService.createMembership(form)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successCreateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failCreateM.abrir();
    }
  }

  async getMembership() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllMembership()
      );

      if (response.data.length > 0) {
        this.membresias = response.data;
      }
    } catch (error: any) {
      this.membresias = [];
    }
  }

  onRedirigir() {
    location.reload();
  }

  onUpdate(data: any) {
    this.item = data;
    this.idItem = data._id;
    this.modalUpdateM.abrir();
  }

  async onForm(form: any) {
    try {
      const response = await lastValueFrom(
        this.adminService.updateMembership(this.idItem, form)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successUpdateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failUpdateM.abrir();
    }
  }

  onQuestion(data: any) {
    this.item = data;
    this.idItem = data._id;
    this.infoDeleteM.abrir();
  }

  async onDelete() {
    try {
      const response = await lastValueFrom(
        this.adminService.deleteMembership(this.idItem, this.item)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successDeleteM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failDeleteM.abrir();
    }
  }
}
