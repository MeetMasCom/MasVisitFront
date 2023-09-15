import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { ReferralsI } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-refers',
  templateUrl: './refers.component.html',
  styleUrls: ['./refers.component.css'],
})
export class RefersComponent implements OnInit {
  referidos: ReferralsI[] = [];
  idU = '';

  constructor(private userService: UserServiceService) { }

  async ngOnInit() {
    this.idU = sessionStorage.getItem('id')!;
    await this.getRefers();
  }

  async getRefers() {
    try {
      const response = await lastValueFrom(
        this.userService.getAllReferes(this.idU)
      );

      if (response.data !== null) {
        this.referidos = response.data;
      }
    } catch (error: any) {
      this.referidos = [];
    }
  }
}
