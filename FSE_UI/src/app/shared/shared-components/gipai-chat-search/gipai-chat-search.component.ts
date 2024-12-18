import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-gipai-chat-search',
  templateUrl: './gipai-chat-search.component.html',
  styleUrl: './gipai-chat-search.component.scss'
})
export class GipaiChatSearchComponent {

  @Input() placeHolder: string = 'Search Criteria';
  @Input() width: string = '100%';
  @Input() backgroundColor: string = '#F0F4FD'; 
  @Input() tooltipContentData:any;
  @Output() search = new EventEmitter<string>();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  tooltipContentAsString(): string {
    return this.tooltipContentData.join('\n');
  }
  performSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value;
    if (!query || query.trim() === '') {
      return;  
    }
    this.search.emit(query);
    this.searchForm.get('searchQuery')?.reset();
  }

  clearSearch(): void {
    this.searchForm.get('searchQuery')?.reset();
  }
  
}
