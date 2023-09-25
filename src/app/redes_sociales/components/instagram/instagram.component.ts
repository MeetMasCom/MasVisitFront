import { Component } from '@angular/core';
import {RedesSocialesService} from '../../services/redes-sociales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent {

  constructor(
    private route: ActivatedRoute,
    private redesSocialesService: RedesSocialesService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  Autorizar(){
    const URL='http://localhost:8000/api/instagram/instagram';
    window.location.href = URL;
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      if (accessToken) {
        this.redesSocialesService.setAccessToken(accessToken);
         
        localStorage.setItem('access_token', accessToken);
        console.log(accessToken);
        this.redirectToCallback();
        //this.router.navigate(['/']);
      }
    });
   
    }
    
    redirectToCallback() {
      window.location.href = 'http://localhost:8000/api/instagram/callback';
    }

}
