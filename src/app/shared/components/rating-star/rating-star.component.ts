import { Component, EventEmitter, Output,Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent {

  @Input() val=0;
  @Output() 
  eventSetRating=new EventEmitter<number>();
constructor( library: FaIconLibrary,){  
}

faStar=faStar;
  title = 'angular-star';
  stars = [1, 2, 3, 4, 5];
  rating = 0;

  updateRating(r:any){    
      this.rating=r;
      this.eventSetRating.emit(this.rating);
  }

}
