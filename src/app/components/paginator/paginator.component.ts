import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() total_products!: number;

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  @Output() pageChange: EventEmitter<{
    first: number;
    rows: number;
    page: number;
  }> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.pageChange.emit({
      first: event.first,
      rows: event.rows,
      page: event.page
    });
  }
}
