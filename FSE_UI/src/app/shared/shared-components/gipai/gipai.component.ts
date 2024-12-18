import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { GipaiRestService } from '../../services/gipai-rest.service';
import { Session } from 'puppeteer';
@Component({
  selector: 'app-gipai',
  templateUrl: './gipai.component.html',
  styleUrl: './gipai.component.scss'
})
export class GipaiComponent implements OnInit {
  examples: any;
  history: any;
  textBackgroundColor: any;
  placeHolder: any;

  gipaiChat: any = [
    // { text: 'Hi, I am GIPAI! How can I help you!!', system: true }
  ];
  query = '';

  tooltipContentArray: string[] = ['Talk to Data', 'Talk to Documentation', 'Explore Data', 'Create IDP', 'Create ARD', 'Run Algorithm'];
  dialogWidth: number = 1000;
  dialogHeight: number = 500;
  dialogTitle: string = 'AI';
  agentList = ['agent1', 'agent2', 'agent3'];

  constructor(private dialogRef: DialogRef, private gipaiService: GipaiRestService) { }

  ngOnInit(): void {
    this.textBackgroundColor = '#F5F5F2';
    this.placeHolder = "Ask me anything...";
    this.getHistoryData();
  }

  searchedQuery(event: any) {
    console.log('Event: ', event);
    this.gipaiChat.push({ text: event, system: false });
    this.loadChatData(event);
  }

  onClickSuggestion(query: string) {
    console.log(query);
    this.query = query;
  }
  close(): void {
    this.dialogRef.close();
  }
  loadChatData(event: any) {
    let req = {
      agent: 'agent2', // this.agentList[1],
      input_text: event,
      session_id: localStorage.getItem('access_token')
    }
    console.log('req--', req)
    this.gipaiService.getChatData(req).subscribe(res => {
      console.log('getChatData----', res)
      this.gipaiChat.push({ text: res.data, system: true });
    });
  }

  getHistoryData() {
    let req = {};
    console.log('req--', req)
    this.gipaiService.getHistoryData(req).subscribe(data => {
      this.examples = data.examplesData;
      this.history = data.historyData;
    });
  }

  get tooltipContentAsString(): string {
    return this.tooltipContentArray.join('\n');
  }
  minimizeDialog() {
    this.dialogWidth = 550;
    this.dialogHeight = 20;
  }

  maximizeDialog() {
    this.dialogWidth = 1000;
    this.dialogHeight = 500;
  }

  OnSelectData(msg: any) {
    console.log('msggg--', msg);
    this.gipaiChat.push({ text: msg, system: false });
    this.loadChatData(msg);
  }

}
