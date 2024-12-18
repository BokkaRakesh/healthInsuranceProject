import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { GipaiRestService } from '../../services/gipai-rest.service';

@Component({
  selector: 'app-gipai-chat',
  templateUrl: './gipai-chat.component.html',
  styleUrl: './gipai-chat.component.scss'
})
export class GipaiChatComponent {
  @ViewChild('scrollBottom') private scrollBottom !: ElementRef;
  examples: any;
  historyList: any=[];
  textBackgroundColor: any;
  placeHolder:any;
  placeHolder2:any;
  gipaiChat: any = [];
  query = '';
 
  suggestions = [
    'Show me the Oncology for study Phase III', 'show me only dicom filetype', ''
  ]
  tooltipContentArray: string[] = ['Talk to Data', 'Talk to Documentation', 'Explore Data', 'Create IDP', 'Create ARD', 'Run Algorithm'];
  dialogWidth = window.outerWidth;
  dialogHeight = window.outerHeight;
  dialogTitle: string = 'AI';


  constructor(private dialogRef: DialogRef, private gipaiService: GipaiRestService) { }
  ngOnInit(): void {
    this.textBackgroundColor = '#F5F5F2';
    this.placeHolder="Ask me anything..."
    this.placeHolder2="message.."
    this.getHistoryData();
    this.scrollToBottom();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
   } 

   scrollToBottom(): void {
       try {
           this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
       } catch(err) { }
   }

  formatText(text: string | undefined): string {
    if (!text) {
      return '';  
    }
    const words = text.split(' ');
    const lastWord = words.pop();  
    const boldWords = words.map(word => `<b class="bold">${word}</b>`); 
    boldWords.push(`<i>${lastWord}</i>` || '');  
    return boldWords.join(' ');  
  }
  
  searchedQuery(event: any) {
    console.log('Event: ', event);
    this.gipaiChat.push({ text: event, system: false });
    this.getHistoryData();
    this.loadChatData(event);
  }

  onClickSuggestion(query: string) {
    console.log(query);
    this.query = query;
  }
  close(): void {
    this.dialogRef.close();
  }
  loadChatData(event:any) {
    let req={
      agent: 'agent1',
      input_text: event,
      session_id: localStorage.getItem('access_token')
    };
    console.log('req--',req)
    this.gipaiService.getChatData(req).subscribe(res => {
      console.log('getChatData----',res);
      this.gipaiChat.push({ text: res.response, system: true });
    });
  }

  getHistoryData() {
    let req={
     
    }
    this.gipaiService.getHistoryData(req).subscribe(data => {
      this.examples = data.examplesData;
      this.historyList = data.historyData;
    });
  }


  // minimizeDialog() {
  //   this.dialogWidth = 550; 
  //   this.dialogHeight = 20; 
  // }

  // maximizeDialog() {
  //   this.dialogWidth = 1000;
  //   this.dialogHeight = 500;
  // }

  OnSelectData(msg:any){
    console.log('msggg--',msg);
    this.gipaiChat.push({ text: msg, system: false });
    this.loadChatData(msg);
  }


}
