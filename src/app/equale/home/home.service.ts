import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Contact} from '../../models/contact';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadContacts() {
    return this.http.get<Contact[]>(`${environment.baseUrl}/users/${this.authService.loggedUser.id}/contacts`);
  }
}
