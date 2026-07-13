import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Services } from '../services/services';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  current_user = signal<any>(null);
  protected services = inject(Services);

  ngOnInit() {
    this.current_user.set(this.services.current_user());
  }

  profile_state = false;
  show_profile() {
    this.profile_state = !this.profile_state;
  }
}
