import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { DealsType, new_deal_value_type } from '../deals.interface';

@Injectable({
  providedIn: 'root',
})
export class Services {
  current_user = signal<any>(null);

  private http = inject(HttpClient);
  api = 'https://my-json-server.typicode.com/hussein-hashima/contacts/db';

  users_Deals_Data = signal<DealsType[]>([]);
  new_deals_value: new_deal_value_type = {
    new_deals: {
      potential: [],
      focus: [],
      contact_made: [],
      offer_sent: [],
      getting_ready: [],
    },
  };
  deals_values = signal<new_deal_value_type>({
    new_deals: {
      potential: [],
      focus: [],
      contact_made: [],
      offer_sent: [],
      getting_ready: [],
    },
  });

  // get_user_data_by_auth() {
  //   const x = window.localStorage.getItem('Token')!;
  //   const token = JSON.parse(x);
  //   const api = 'https://dummyjson.com/auth/me';

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http.get(api, { headers }).subscribe({
  //     next: (res) => {
  //       console.log('from auth func', res);
  //       this.current_user.set(res);
  //     },
  //   });
  // }

  getUsersData() {
    // to rest the deals
    this.users_Deals_Data.set([]);

    return this.http.get<{ deals: DealsType[] }>(this.api).pipe(
      tap({
        next: (res) => {
          console.log('>>>>res', res);
          this.users_Deals_Data.set(res.deals);
          // check saved data
          if (window.localStorage.getItem('new_deals_value')) {
            console.log('there is a Saved data in local storage');
            //
            this.get_saved_deals();
            // let x = window.localStorage.getItem('new_deals_value')!;
            // let saved_data = JSON.parse(x);
            // this.deals_values.set(saved_data);
          } else {
            console.log('there is No saved data');
            this.filter_api_data(this.users_Deals_Data());
          }
        },
      }),
    );
  }

  filter_api_data(input_data: any) {
    console.log('filter this data', input_data);

    input_data.map((value: DealsType) => {
      if (value.status == 'Potential Value') {
        this.deals_values().new_deals.potential.push(value);
      } else if (value.status == 'Focus') {
        this.deals_values().new_deals.focus.push(value);
      } else if (value.status == 'Contact Made') {
        this.deals_values().new_deals.contact_made.push(value);
      } else if (value.status == 'Offer Sent') {
        this.deals_values().new_deals.offer_sent.push(value);
      } else if (value.status == 'Getting Ready') {
        this.deals_values().new_deals.getting_ready.push(value);
      }
    });
    // save to local storage
    // window.localStorage.setItem('new_deals_value', JSON.stringify(this.deals_values()));
    this.create_save(this.deals_values());
  }

  create_save(data: any) {
    window.localStorage.setItem('new_deals_value', JSON.stringify(data));
    this.get_saved_deals();
  }

  get_saved_deals() {
    let x = window.localStorage.getItem('new_deals_value')!;
    this.deals_values.set(JSON.parse(x));
  }

  add_new_deal(status: string, deal_Data: any) {
    // get the old saved values
    let old_value = JSON.parse(window.localStorage.getItem('new_deals_value')!);
    // let deals_values = JSON.parse(value);
    // check its status
    if (status == 'Potential Value') {
      old_value.new_deals.potential.unshift(deal_Data);
    } else if (status == 'Focus') {
      old_value.new_deals.focus.unshift(deal_Data);
    } else if (status == 'Contact') {
      old_value.new_deals.contact_made.unshift(deal_Data);
    } else if (status == 'Offer Sent') {
      old_value.new_deals.offer_sent.unshift(deal_Data);
    } else if (status == 'Getting Ready') {
      old_value.new_deals.getting_ready.unshift(deal_Data);
    }

    // update the old deals values
    this.create_save(old_value);
    // window.localStorage.setItem('new_deals_value', JSON.stringify(this.deals_values()));
  }

  edit_deal(deal_data: any) {
    const old_value = window.localStorage.getItem('new_deals_value') || '';
    const saved = JSON.parse(old_value);
    const all_old_deals = [
      ...saved.new_deals.potential,
      ...saved.new_deals.offer_sent,
      ...saved.new_deals.getting_ready,
      ...saved.new_deals.focus,
      ...saved.new_deals.contact_made,
    ];

    const output = all_old_deals.map((value) => {
      if (deal_data.id == value.id) {
        console.log(true, value);
        return deal_data;
      } else {
        return value;
      }
    });
    // -------------------
    let edited_deals_value: new_deal_value_type = {
      new_deals: {
        potential: [],
        focus: [],
        contact_made: [],
        offer_sent: [],
        getting_ready: [],
      },
    };
    output.map((value: DealsType) => {
      if (value.status == 'Potential Value') {
        edited_deals_value.new_deals.potential.push(value);
      } else if (value.status == 'Focus') {
        edited_deals_value.new_deals.focus.push(value);
      } else if (value.status == 'Contact Made') {
        edited_deals_value.new_deals.contact_made.push(value);
      } else if (value.status == 'Offer Sent') {
        edited_deals_value.new_deals.offer_sent.push(value);
      } else if (value.status == 'Getting Ready') {
        edited_deals_value.new_deals.getting_ready.push(value);
      }
    });
    console.log(edited_deals_value);
    // save to local storage
    this.create_save(edited_deals_value);
  }
}
