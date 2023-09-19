import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileServiceService } from 'src/app/profile/service/profile-service.service';
import { SharedserviceService } from '../../services/sharedservice.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  token: any;
  user: string='';
  id: string='';
  notification: any;
  nuevas: any;

  constructor(
    public sharedService: SharedserviceService,
    public profileService: ProfileServiceService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')!) {
      this.token = JSON.parse(sessionStorage.getItem('token')!);
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    this.getNotificacion();
  }

  async getNotificacion() {
    const resp = await lastValueFrom(
      this.profileService.getNotificationUser(this.id)
    );
    if (resp.data.length > 0) {
      this.notification = resp.data;
      this.notification.forEach((element: any, index: any) => {
        if (element.state === 0) {
          this.nuevas++;
        }
      });
    } else {
      //console.log('no se encontraron datos');
    }
  }

  async onRadioChange(id_noti:string)
  {
    await lastValueFrom(this.profileService.updateNotification(id_noti));
    location.reload();
  }




}
