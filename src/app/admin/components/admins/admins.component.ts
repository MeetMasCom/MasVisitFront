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
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {

  @ViewChild('updateAdministrador') updateAdministrador!: MmodalComponent;

  dropdownSettings: IDropdownSettings = {};
  rolList: any = [];
  selectedRol: any = [];
  dataAdmin: any;
  adminDetail: any;
  idAdmin: any;

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
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

    this.getAdmin();
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

  async getAdmin() {
    const resp = await lastValueFrom(this.adminService.getAdmin());

    if (resp !== null) {
      this.dataAdmin = resp.data;
      console.log('dataAdmin', this.dataAdmin);
    } else {
      console.log('no se encontraron datos');
    }
  }

  async enable(id: string) {
    const state = 0;
    const resp = await lastValueFrom(
      this.adminService.updateStateAdmin(id, state)
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
      this.adminService.updateStateAdmin(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
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
