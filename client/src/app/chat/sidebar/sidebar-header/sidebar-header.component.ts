import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import ISearchParams from '../../../interfaces/search-params.interface';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {

  @Output() searchParams: EventEmitter<ISearchParams> = new EventEmitter();

  private flag: string = 'public';
  private searchString: string = '';

  constructor() { }

  ngOnInit() { }

  sendSearchParams(): void {
    this.searchParams.emit({
      flag: this.flag,
      string: this.searchString,
    });
  }
}
