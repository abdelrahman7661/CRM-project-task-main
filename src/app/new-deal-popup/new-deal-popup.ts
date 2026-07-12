import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Services } from '../services/services';
import { DealsType } from '../deals.interface';

@Component({
  selector: 'app-new-deal-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './new-deal-popup.html',
  styleUrl: './new-deal-popup.css',
})
export class NewDealPopup implements OnInit {
  private services = inject(Services);
  selected_deal_to_edit = input<DealsType>();
  close = output();
  success_state = output<string>();
  edit_mode = input<boolean>();

  ngOnInit() {
    // to get if there is date to edit
    if (this.edit_mode()) {
      this.new_deal.patchValue({
        first_name: this.selected_deal_to_edit()?.first_name,
        last_name: this.selected_deal_to_edit()?.last_name,
        // phone: parseInt(this.selected_deal_to_edit()?.phone),
        phone: this.selected_deal_to_edit()?.phone,
        email: this.selected_deal_to_edit()?.email,
        company: this.selected_deal_to_edit()?.company,
        probability_status: this.selected_deal_to_edit()?.probability_status,
        status: this.selected_deal_to_edit()?.status,
      });
    }
  }

  closePopup() {
    this.close.emit();
  }
  // config for input forms
  max_length_input = 20;

  new_deal = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(this.max_length_input),
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(this.max_length_input),
      Validators.required,
    ]),
    phone: new FormControl('', [Validators.minLength(5), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [Validators.required]),
    probability_status: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    status: new FormControl('', Validators.required),
  });

  get error_first_name() {
    return (
      this.new_deal.controls.first_name.dirty &&
      this.new_deal.controls.first_name.touched &&
      this.new_deal.controls.first_name.invalid
    );
  }
  get error_last_name() {
    return (
      this.new_deal.controls.last_name.dirty &&
      this.new_deal.controls.last_name.touched &&
      this.new_deal.controls.last_name.invalid
    );
  }
  get error_probability_status() {
    return (
      this.new_deal.controls.probability_status.dirty &&
      this.new_deal.controls.probability_status.touched &&
      this.new_deal.controls.probability_status.invalid
    );
  }

  confirm_deal_edit() {
    let new_deal_value = {
      ...this.new_deal.value,
      id: this.selected_deal_to_edit()!.id,
      date: this.selected_deal_to_edit()!.date,
      state: this.selected_deal_to_edit()!.state,
    };
    this.services.edit_deal(new_deal_value);
    this.success_state.emit('Deal Edited Successfully');
    this.closePopup();
  }

  submit() {
    console.log('submit');
    if (this.new_deal.valid) {
      // const check_user = window.confirm('Do you want to add this new deal ?');
      // if (!check_user) {
      //   return;
      // }
      // s
      const idd = crypto.randomUUID();
      const date = new Date();
      let dealData = { ...this.new_deal.value, id: idd, date: date, state: 'New' }; // Adding the new Deal
      this.services.add_new_deal(this.new_deal.value.status!, dealData); // to check the type of new deal status type value
      this.new_deal.reset();
      this.success_state.emit('Deal Added Successfully');
      this.closePopup();
    } else {
      this.new_deal.markAllAsTouched();
    }
  }
}
