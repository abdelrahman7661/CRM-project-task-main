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
  // edit_popup = model(); // this is a model two way binding v
  edit = output<DealsType>();

  export_selected_deal_to_edit() {
    // this.edit_popup.set(true);
    this.edit.emit(this.userCardData()!);
  }
}
