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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  
  @ViewChild('updateAdministrador') updateAdministrador!: MmodalComponent;

  dropdownSettings: IDropdownSettings = {};
  rolList: any = [];
  selectedRol: any = [];
  dataAdmin: any;
  adminDetail: any;
  idAdmin: any;
  dataValid: any;
  errMsj: any;
  user_data: any;
  api: string='';
  id: string='';

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private profileService: ProfileServiceService,
    private router: Router,
    private toastr: ToastrService,
    public constante: ConstantsSystem
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getTeacher();
      this.getValidTeacher();
    }else {
      this.router.navigate(['/admin']);
    }
    this.selectedRol = [];

    this.rolList = [
      { item_id: '1', item_text: 'Soporte Sistemas' },
      { item_id: '2', item_text: 'Soporte Ventas' },
      { item_id: '3', item_text: 'Soporte Anuncios' },
      ,
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

   
  }

  onSelectRol(item: any) {
    console.log('1', item);
    this.selectedRol = [];
    this.selectedRol.push(item);
  }

  onSelectAllRoles(items: any) {
    console.log('2', items);
    this.selectedRol = [];
    items.forEach((element: any) => {
      this.selectedRol.push(element);
    });
  }

  async onRegisterAdmin(form: any) {
    console.log('form', form.value);
    console.log('item', this.selectedRol);

    const resp = await lastValueFrom(
      this.adminService.createAdmin(form, this.selectedRol)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('error en el registro');
    }
  }

  async getTeacher() {
    const tipo=2;
    const resp = await lastValueFrom(this.adminService.getverifyTeacher(tipo));
    if (resp !== null) {
      this.dataAdmin = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async getValidTeacher() {
    const tipo=1;
    const resp = await lastValueFrom(this.adminService.getverifyTeacher(tipo));
    if (resp !== null) {
      this.dataValid = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

   
  AlertaSucess(msj:string) {
    this.toastr.success(msj, 'Éxito',{ timeOut: 4000 });
  }

  AlertaFail(msj:string) {
    this.toastr.error(msj, 'Error',{ timeOut: 4000 });
  }

  async enable(id: string) {
    try{
      const state = 2;
      const resp = await lastValueFrom(
        this.profileService.updateTypeUser(id, state)
      );
  
      if (resp !== null) {
        const notify = 'Tu solicitud de profesor fue aceptada';
        await lastValueFrom(this.adminService.addNotification(this.id, id, notify));
        const msj='La solicitud ha sido aprobada';
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
    catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
        this.AlertaFail(this.errMsj);
        location.reload();
    }
  }

  async disable(id: string) {
    try{
      const state = 0;
      const resp = await lastValueFrom(
        this.profileService.updateTypeUser(id, state)
      );
  
      if (resp.data !== null) {
        const notify = 'Tu solicitud de profesor fue rechazada';
        await lastValueFrom(this.adminService.addNotification(this.id, id, notify));
        const msj='La solicitud ha sido rechazada';
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
    catch (error: any) {
      this.errMsj = error.error.message;
        this.AlertaFail(this.errMsj);
        location.reload();
    }
  }

  async detailAdmin(id: string) {
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.getAdminById(id)
    );

    if (resp !== null) {
      this.adminDetail=resp.data[0];
      this.idAdmin=this.adminDetail._id;
      this.updateAdministrador.abrir();
    } else {
      console.log('no se encontraron datos');
    }
  }


  async updateAdmin(event:any){
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.updateAdmin(this.idAdmin,event)
    );

    if (resp !== null) {
     location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }
  
}
