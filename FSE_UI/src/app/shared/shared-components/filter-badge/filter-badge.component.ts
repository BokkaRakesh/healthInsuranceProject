import { Component, EventEmitter, Input, Output, ViewChild, viewChild} from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

interface BatchEto {
  dialogOptionType:string,
  displayName:string,
  id: string,
  inclusion: string,
  value: string
}
@Component({
  selector: 'app-filter-badge',
  templateUrl: './filter-badge.component.html',
  styleUrl: './filter-badge.component.scss',
})
export class FilterBadgeComponent {
  filteredBatch :any = []
  @Output() emitBatchDetailForEdit =  new EventEmitter<BatchEto>();
  showbatchCount = 2;
  batches: any[] = [];
  isAtStart = true;
  isAtEnd = false;
  @Output() batchEmit = new EventEmitter<any>()
  constructor(private sharedService: SharedService){}
  ngOnInit() {
    //Subscribe the emitted data here to update the batches
    this.sharedService.batchSubject.subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        // If the incoming data is an empty array, set batches to empty
        this.batches = [];
      }else if (typeof data === 'object' && data) {
        // console.log('typeof(data.values)---',typeof(data.values));
        const upcomingBatch = {
          id: data?.id,
          value: typeof(data.values) === 'object' ? data?.values?.join(' ') : data?.values,
          inclusion: data?.inclusion ? 'Is' : 'Is Not',
          displayName: data?.displayName,
          dialogOptionType: data?.dialogOptionType,
          isFilter: true
        };
        // Remove any existing batch with the same id
        this.batches = this.batches.filter(
          (batch) => batch.id !== upcomingBatch.id
        );
        // Push the new batch
        this.batches.push(upcomingBatch);
      }
    });
  }

  sqlToTextData(sqlToTextValue: any[]){
    this.batches = sqlToTextValue;
  }

  leftScroll() {
    const content = document.querySelector('.carousel-content');
    content?.scrollBy(-500, 0);
    this.updateChevronVisibility(content);

  }
  rightScroll() {
   const content= document.querySelector('.carousel-content');
   content?.scrollBy(500, 0);
    this.updateChevronVisibility(content);
  }

  updateChevronVisibility(carouselContent: Element | null) {
    if (carouselContent) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselContent as HTMLElement;
      this.isAtStart = scrollLeft === 0;
      this.isAtEnd = scrollLeft + clientWidth >= scrollWidth;
    }
  }

  onClearBadge() {
    this.batches = [];
    this.batchEmit.emit(this.batches);
  }

  onBatchDeletion(index: any){
   const splice= this.batches.splice(index, 1);
   console.log('removed batch', splice);
   console.log(' batch array', this.batches);
   this.batchEmit.emit(this.batches.filter((batch)=> batch.isFilter));
  }

  onBatchEdit(batch: BatchEto){
    this.emitBatchDetailForEdit.emit(batch)
  }

  ngOnDestroy(){
    this.sharedService.batchSubject.next(null)
  }
}


