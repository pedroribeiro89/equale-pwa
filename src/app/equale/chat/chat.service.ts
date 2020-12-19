import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Chat, Message} from '../../models/Chat';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadUserMessages(receiverId: number): Observable<Chat> {
    let params = new HttpParams();
    params = params.set('receiverId', receiverId.toString());
    return this.http.get<Chat>(`${environment.baseUrl}/users/${this.authService.loggedUser.id}/messages`, { params });
  }

  updateReceivedMessages(receiverId: number) {
    this.http.patch(`${environment.baseUrl}/users/${this.authService.loggedUser.id}/messages`, { receiverId }).subscribe();
  }

  sendMessage(receiverId: number, message: string): Observable<Message> {
    const body = { receiverId, message };
    return this.http.post<Message>(`${environment.baseUrl}/users/${this.authService.loggedUser.id}/messages`, body);
  }
}
