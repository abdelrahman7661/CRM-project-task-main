import { Component, input, output } from '@angular/core';
import { DealsType } from '../deals.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  userCardData = input<DealsType>();
  status = input<string>('');
  edit = output<DealsType>();
  delete = output<DealsType>();

  export_selected_deal_to_edit() {
    this.edit.emit(this.userCardData()!);
  }

  delete_selected_deal_to_edit() {
    console.log('delete this deal');
    this.delete.emit(this.userCardData()!);
  }
}
