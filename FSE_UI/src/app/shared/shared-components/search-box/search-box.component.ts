import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit {
  @Input() placeHolder: string = 'Search Criteria';
  @Input() width: string = '100%';
  @Input() backgroundColor: string = '#F0F4FD'; 
  @Output() search = new EventEmitter<string>();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  performSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value;
    this.search.emit(query);
    this.searchForm.get('searchQuery')?.reset();
  }

  clearSearch(): void {
    this.searchForm.get('searchQuery')?.reset();
  }
  
}
