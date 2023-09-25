import { Component } from '@angular/core';
import { RedesSocialesService } from '../../services/redes-sociales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback-instagram',
  templateUrl: './callback-instagram.component.html',
  styleUrls: ['./callback-instagram.component.css'],
})
export class CallbackInstagramComponent {

  constructor(
    private route: ActivatedRoute,
    private redesSocialesService: RedesSocialesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      if (accessToken) {
        this.redesSocialesService.setAccessToken(accessToken);

        localStorage.setItem('access_token', accessToken);
        console.log("token de acceso Instagram",accessToken);
        //this.router.navigate(['/']);
      }
    });
  }
}
