import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-columns',
  templateUrl: './columms.component.html',
  styleUrls: ['./columms.component.css']
})
export class ColummsComponent {
  @Input() tipo=0;
  
  faStar=faStar;
}
