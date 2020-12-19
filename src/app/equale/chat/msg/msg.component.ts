import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/Chat';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {

  @Input() message: Message;
  @Input() rightMsg = true;

  constructor() { }

  ngOnInit(): void {
  }

}
