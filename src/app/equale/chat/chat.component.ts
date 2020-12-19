import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Chat, Message, Receiver} from '../../models/Chat';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  // public msgs = [
  //   { id: 1, user: 1, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 2, user: 1, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 3, user: 2, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 4, user: 1, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 5, user: 2, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 6, user: 1, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 7, user: 2, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 8, user: 2, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 9, user: 1, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() },
  //   { id: 10, user: 2, msg: 'Bla bla bla bla bla bla bla bla bla bla bla bla', date: new Date() }
  // ];

  private routeSubscription: Subscription;

  public userId: number;

  public receiver: Receiver;
  public messages: Message[];
  public isLoading = false;
  public errorMsg = '';

  public messageControl = new FormControl();
  public sendMessageErrorMsg = '';
  public isSendingMessage = false;

  constructor(public service: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.userId = params.id;
      this.loadUserMessages();
    });
  }

  ngOnDestroy() { this.routeSubscription.unsubscribe(); }

  loadUserMessages() {
    this.errorMsg = '';
    this.isLoading = true;
    this.service.loadUserMessages(this.userId)
      .subscribe(
        (chat: Chat) => {
          this.receiver = chat.receiver;
          this.messages = chat.messages;
          this.isLoading = false;
          this.service.updateReceivedMessages(this.receiver.id);
        },
        error => {
          this.errorMsg = 'Erro ao carregar mensagens. Tente mais tarde';
          this.isLoading = false;
        }
      );
  }

  sendMessage() {
    this.sendMessageErrorMsg = '';
    this.isSendingMessage = true;
    this.service.sendMessage(this.receiver.id, this.messageControl.value)
      .subscribe(
        (message: Message) => {
          this.messages.push(message);
          this.messageControl.reset();
          this.isSendingMessage = false;
        },
        error => {
          this.sendMessageErrorMsg = 'Erro ao enviar mensagem. Tente novamente mais tarde';
          this.isSendingMessage = false;
        }
      );
  }

}
