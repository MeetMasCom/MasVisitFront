import { Component } from '@angular/core';
import { ConstantsSystem } from 'src/app/utils/constants-system';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
api: string ='';


  constructor(public constante: CommentComponent
    ) {}
    async ngOnInit() {
    }

    onComment(form:any){

    }



}
