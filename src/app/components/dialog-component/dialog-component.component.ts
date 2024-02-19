import {Component, Input} from '@angular/core';
import {DeleteBookComponent} from "../delate-book/delete-book.component";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent {

  @Input() title: string = '';

  constructor(){}




}
