import { Component, ViewChild } from '@angular/core';
import { ProfileServiceService } from '../../service/profile-service.service';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';

import { lastValueFrom } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
//import { CourseServiceService } from 'src/app/courses/services/course-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  api: string = '';
  data: any;
  user: any;
  id: string = '';
  courses: any;
  dataUsers: any;
  fullText: string = '';
  defaultTextLength: number = 150;
  previewText: string = '';
  showFullText: boolean = false;
  dataC: any;
  verify: boolean = false;

  constructor(
    //private courseService: CourseServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('data')!) {
      this.data = sessionStorage.getItem('data')!;
      this.dataUsers = JSON.parse(sessionStorage.getItem('data')!);
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      //this.getCourses();
    } else {
      this.router.navigate(['/inicio']);
    }
  }
  preview(text: string): string {
    this.previewText = text.slice(0, this.defaultTextLength);
    return this.previewText;
  }

  // async getCourses() {
  //   const resp = await lastValueFrom(this.courseService.getAllCourses());
  //   if (resp?.data.length > 0) {
  //     this.courses = resp.data;
  //   }
  // }

  // async Acceder(id: string, price: any) {
  //   this.verify = false;
  //   const response = await lastValueFrom(
  //     this.courseService.verifyCourseUser(this.id, id)
  //   );
  //   if (response.data.length > 0) {
  //     this.verify = true;
  //   }
  //   if (price === 0) {
  //     this.router.navigate(['/courseU'], {
  //       queryParams: { id },
  //     });
  //   }
  //   if(price> 0)
  //   {
  //     if (this.verify === false) {
  //       this.router.navigate(['/detailU'], {
  //         queryParams: { id },
  //       });
  //     }
  //     if (this.verify === true) {
  //       this.router.navigate(['/courseU'], {
  //         queryParams: { id },
  //       });
  //     }
  //   }
    
  // }
}
