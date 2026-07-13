import { Component, inject } from '@angular/core';
import { Services } from '../services/services';
import { Header } from '../header/header';

@Component({
  selector: 'app-setting',
  imports: [Header],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  protected services = inject(Services);

  popupState = false;
  showPopup() {
    this.popupState = true;
  }
  restSavedData() {
    // window.localStorage.clear();
    window.localStorage.removeItem('new_deals_value');
    this.services.deals_values.set({
      new_deals: {
        potential: [],
        focus: [],
        contact_made: [],
        offer_sent: [],
        getting_ready: [],
      },
    });
    this.popupState = false;
  }
  cancel() {
    this.popupState = false;
  }
}
