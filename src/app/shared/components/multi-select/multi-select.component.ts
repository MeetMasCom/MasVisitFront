
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit{
  @Input() dropdownList: any = [];
  @Input() selectedItems: any = [];
  @Input() dropdownSettings: IDropdownSettings = {};
  @Input() placeHolder: string = '';
  @Output() selectItem = new EventEmitter();
  @Output() selectAll? = new EventEmitter();

  ngOnInit() {}

  onItemSelect(item: any) {
    this.selectItem.emit(item);
  }

  onSelectAll(items: any) {
    this.selectAll?.emit(items);
  }
}
