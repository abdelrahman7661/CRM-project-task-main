import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  message = input("")
}
