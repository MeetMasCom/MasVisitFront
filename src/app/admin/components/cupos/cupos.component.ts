import { Component, Input, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { UserServiceService } from '../../../user/services/user-service.service';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cupos',
  templateUrl: './cupos.component.html',
  styleUrls: ['./cupos.component.css'],
})
export class CuposComponent {
  @ViewChild('modalUpdateCupo') modalUpdateCupo!: ModalAlertsComponent;
  @ViewChild('modalDarCupo') modalDarCupo!: ModalAlertsComponent;
  @Input() parametro: any;
  cupo!: number;
  estado!: number;
  msj: string = '';
  api: string = '';
  data: any;
  user: any;
  id: string = '';
  cupon: any;
  idCupo: string = '';
  cuponS: any;
  modalAbierta = false;
  allUser: any;
  userId: any;
  cupoId: any;
  userAdmin: any;
  cuponUser: any;
  constructor(
    private adminService: AdminServiceService,
    private userService: UserServiceService,
    private router: Router,
    public constante: ConstantsSystem,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('data')!) {
      this.data = sessionStorage.getItem('data')!;
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    } else {
      this.router.navigate(['/inicio']);
    }

    this.getCuponUser();
    this.getAllUser();
    this.getByIdAdminCupon();
  }

  async getCuponUser() {
    const resp = await lastValueFrom(this.adminService.getCuponUser(this.id));
    if (resp?.data.length > 0) {
      this.cupon = resp.data;
    }
  }

  async getAllUser() {
    const resp = await lastValueFrom(this.adminService.getUsersincupo());
    if (resp?.data.length > 0) {
      this.allUser = resp.data;
    }
  }

  async onSelectedCupo(id: string) {
    this.idCupo = id;
    const resp = await lastValueFrom(
      this.adminService.getCuponById(this.idCupo)
    );
    if (resp?.data.length > 0) {
      this.cuponS = resp.data[0];
    }
    this.modalUpdateCupo.abrir();
  }

  async enable(id: string) {
    const state = 0;
    const resp = await lastValueFrom(
      this.adminService.updateStateCupon(id, state)
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
      this.adminService.updateStateCupon(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  onUpdateCupo(form: any) {
    if (form.value.valor < 0) {
      this.estado = 2;
      this.msj = 'Valor no permitido';
    } else {
      this.adminService
        .updatedCupo(this.idCupo, form, this.id)
        .subscribe((data) => {
          if (data != null) {
            this.estado = 1;
            this.msj = 'Cupo actualizado';
            setTimeout("location.href='/cupones'", 1000);
          } else {
            this.estado = 0;
            this.msj = 'Ah ocurrido un error inesperado, vuelva a intentarlo';
          }
        });
    }
    form.reset();
  }

  onRegisterCupo(form: any) {
    if (form.value.valor < 0) {
      this.estado = 2;
      this.msj = 'Valor no permitido';
    } else {
      this.adminService.registerCupo(this.id, form).subscribe((data) => {
        if (data != null) {
          this.estado = 1;
          this.msj = 'Cupo registrado';
          setTimeout("location.href='/cupones'", 1000);
        } else {
          this.estado = 0;
          this.msj = 'Ah ocurrido un error inesperado, vuelva a intentarlo';
        }
      });
    }
    form.reset();
  }

  async selectUser(id: string) {
    const resp = await lastValueFrom(this.userService.getUserById(id));
    if (resp?.data.length > 0) {
      this.userId = resp.data[0];
      const resp1 = await lastValueFrom(this.adminService.getCuponActivoUser(this.id));
    if (resp1?.data.length > 0) {
      this.cuponUser = resp1.data;
    }
      this.modalDarCupo.abrir();
    }

  }

  async selectCupo(id: string) {
    const resp = await lastValueFrom(this.adminService.getCuponById(id));
    if (resp?.data.length > 0) {
      this.cupoId = resp.data;
    }
  }

  async onSaveCupo(form: any) {
    const resp = await lastValueFrom(
      this.adminService.darCupo(this.id, this.userId._id, form)
    );
    if (resp.data !== null) {
      const msj = 'Cupo enviado el usuario';
      const message =
        'Tienes un cupo del ' +
        this.cupoId[0].porcentaje +
        '% para la compra de tu próxima membresía';
      const resp1 = await lastValueFrom(
        this.adminService.addNotification(this.id, this.userId._id, message)
      );
      if (resp1 !== null) {
        const val=1;
        const resp2 = await lastValueFrom(
          this.adminService.restarCupon(this.cupoId[0]._id,val)
        );
        if (resp2 !== null) {
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
      }
    }
  }

  AlertaSucess(msj: string) {
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }

  async getByIdAdminCupon() {
    const resp = await lastValueFrom(
      this.adminService.getByIdAdminCupon(this.id)
    );
    if (resp?.data.length > 0) {
      this.userAdmin = resp.data;
    }
  }

  async retirarCupo(idCupo: string, cupo: number, idUser: string) {
    const resp = await lastValueFrom(this.adminService.deleteCupoUser(idCupo));
    if (resp.data===1) {
      const msj = 'Cupo eliminado';
      const message =
        'Su cupo del ' +
        cupo +
        '% para la compra de tu próxima membresía ha sido eliminado';
        const resp1 = await lastValueFrom(
          this.adminService.addNotification(this.id, idUser, message)
        );
        if (resp1 !== null) {
          this.AlertaSucess(msj);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
    }
  }
}
