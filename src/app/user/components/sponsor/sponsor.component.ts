import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
})
export class SponsorComponent implements OnInit {
  constructor(
    private clipboardService: ClipboardService,
    private toastr: ToastrService,
    private authServiceService: AuthServiceService,
    private userServiceService: UserServiceService
  ) {}

  ngOnInit(): void {}

  getVerify() {
    let valid: boolean = false;
    const user: any = JSON.parse(sessionStorage.getItem('data')!);
    if (user) {
      valid = user.agreements ?? false;
    }
    return valid;
  }

  onSubmit() {
    const user = sessionStorage.getItem('id');
    this.authServiceService.updateAgreements(user!).subscribe((res) => {
      this.updateInfoUser();
    });
  }

  updateInfoUser() {
    const user: any = sessionStorage.getItem('id');
    this.userServiceService.getInfoUser(user!).subscribe((res) => {
      sessionStorage.setItem('data', JSON.stringify(res.data));
    });
  }

  onCopy() {
    this.clipboardService.copy(this.getUrl());
    this.toastr.success('Texto copiado', 'Aviso');
  }

  getUrl() {
    const sponsor = sessionStorage.getItem('user');
    return (
      window.location.protocol +
      '//' +
      window.location.host +
      '/registro?u=' +
      sponsor
    );
  }
}
