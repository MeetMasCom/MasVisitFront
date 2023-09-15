import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { ProfileServiceService } from '../../../profile/service/profile-service.service';

@Component({
  selector: 'app-feedback-user',
  templateUrl: './feedback-user.component.html',
  styleUrls: ['./feedback-user.component.css']
})
export class FeedbackUserComponent {
  api: string='';
  id: string='';

  constructor(
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private clipboardService: ClipboardService,
    private toastr: ToastrService,
    private authServiceService: AuthServiceService,
  ) {}


  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;

    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async registerFeedback(form: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.registerFeddback(this.id, form, )
      );
      if (resp.data !== null) {
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }


}
