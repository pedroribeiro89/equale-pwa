import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {Contact} from '../../models/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactList: Contact[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(public service: HomeService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.errorMsg = '';
    this.isLoading = true;
    this.service.loadContacts()
      .subscribe(
        (contacts: Contact[]) => {
          this.contactList = contacts;
          this.isLoading = false;
        },
        error => {
          this.errorMsg = 'Erro ao carregar contatos. Tente mais tarde.';
          this.isLoading = false;
        }
      );
  }

}
