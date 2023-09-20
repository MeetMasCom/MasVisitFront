import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { lastValueFrom } from 'rxjs';
import { UserServiceService } from '../../../user/services/user-service.service';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.css']
})
export class ProfessionsComponent {
  api: string='';
  id: string='';
  feedback: any=[];
  dataC: any = [];
  param:string='';
  token: string='';
  idCatalogue: string='';

  constructor(
    private adminService: AdminServiceService,
    private userService: UserServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private toastr: ToastrService,
  ) {}


  
  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('token')!) {
      this.token=sessionStorage.getItem('token')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.params.subscribe(params => {
        this.param = params['code'];
        this.getCatalogue();
        this.getData();
        
      });
      
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getCatalogue() {
    try {
      const response = await lastValueFrom(
        this.userService.getData(this.param)
      );

      if(response.data !== null){
        this.idCatalogue=response.data._id;
      }
      else
      {
        console.log("No se encontraron datos");
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getData() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog(this.param)
      );

      if(response.data!==null){
        this.dataC=response.data;
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
  

  async onRegisterOptions(name:any){
    try {
      const response = await lastValueFrom(
        this.userService.putCatalogue(this.idCatalogue,this.token,name)
      );

      if(response.data!=null){
        location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}
