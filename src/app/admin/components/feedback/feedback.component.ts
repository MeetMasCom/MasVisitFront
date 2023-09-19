import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  api: string='';
  id: string='';
  feedback: any=[];


  constructor(
    private adminService: AdminServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private toastr: ToastrService,
  ) {}


  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getFeedback();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getFeedback() {
    try {
      const resp = await lastValueFrom(
        this.adminService.getFeedBack()
      );
      if (resp.data !== null) {
        this.feedback=resp.data;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }



}
