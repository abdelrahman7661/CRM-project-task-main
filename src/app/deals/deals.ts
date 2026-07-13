import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { DealsType } from '../deals.interface';
import {
  CdkDrag,
  CdkDropListGroup,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NewDealPopup } from '../new-deal-popup/new-deal-popup';
import { Services } from '../services/services';
import { Header } from '../header/header';
import { Success } from '../toster/success/success';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-deals',
  imports: [
    UserCard,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
    FormsModule,
    NewDealPopup,
    Header,
    Success,
  ],
  templateUrl: './deals.html',
  styleUrl: './deals.css',
})
export class Deals {
  protected services = inject(Services);

  errorMessage = signal(false);
  loading = signal(true);
  searchValue = signal('');
  searchResultValue = signal<DealsType[]>([]);
  showSearchResultCard = false;
  disableDropFunc = false;
  showNewDealPopup = false;
  selected_deal_data_1: DealsType | undefined;
  edit_mode_check = signal(false);
  success_popup_state = signal(false);
  current_user = signal<any>(null);

  router = inject(Router);
  http = inject(HttpClient);

  ngOnInit() {
    this.services.getUsersData().subscribe({
      error: () => {
        window.alert('Check your internet connection...');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  // to get the data from deal card to pass it to popup edit card
  edit_selected_deal(selected_deal: DealsType) {
    this.showNewDealPopup = true;
    this.edit_mode_check.set(true);
    this.selected_deal_data_1 = selected_deal;
  }

  search_v2() {
    let all_deals = [
      ...this.services.deals_values().new_deals.potential,
      ...this.services.deals_values().new_deals.offer_sent,
      ...this.services.deals_values().new_deals.getting_ready,
      ...this.services.deals_values().new_deals.focus,
      ...this.services.deals_values().new_deals.contact_made,
    ];
    let result = all_deals.filter((value) => {
      return value.first_name.toLowerCase().includes(this.searchValue());
    });
    this.showSearchResultCard = true;
    this.searchResultValue.set(result);
    // when to show the search card
    if (this.searchValue().length == 0 || result.length == 0) {
      this.showSearchResultCard = false;
    }
  }

  clearSearchValue() {
    this.searchValue.set('');
    this.search_v2();
  }

  add_deal_popup() {
    this.selected_deal_data_1 = undefined;
    this.showNewDealPopup = true;
  }

  msg = signal('');
  show_success_toaster(state: any) {
    this.msg.set(state);
    console.log(state);
    this.success_popup_state.set(true);
    setTimeout(() => {
      this.success_popup_state.set(false);
    }, 5000);
  }
  close_deal_popup() {
    this.showNewDealPopup = false;
    this.edit_mode_check.set(false);
    console.log('edit mode state', this.edit_mode_check());
  }

  rest() {
    window.localStorage.clear();
  }

  drop(event: CdkDragDrop<DealsType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.services.create_save(this.services.deals_values());
  }
}
