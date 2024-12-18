import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cascade-search-bar',
  templateUrl: './cascade-search-bar.component.html',
  styleUrl: './cascade-search-bar.component.scss'
})
export class CascadeSearchBarComponent {
  @Input() placeHolder: string = 'Explore Data';
  @Output() expandSearchBoxEmitter = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>(); 
  @ViewChild('textBox') textBox: any;
  expandSearchBox = false;
  
  performSearch(): void {
    this.search.emit(this.textBox?.value);
    this.clearSearch();
  }

  clearSearch(): void {
    this.textBox.value = "";
    this.onBlur();
  }
  onFocus() {
    this.expandSearchBox = true;
    this.expandSearchBoxEmitter.emit(this.expandSearchBox);
  }
 
  onBlur() {
    if (!this.textBox.value) {
      this.expandSearchBox = false;
      this.expandSearchBoxEmitter.emit(this.expandSearchBox);
    }
  }
}
