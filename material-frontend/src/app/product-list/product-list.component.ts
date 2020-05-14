import {Item} from '../model/item';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import {TokenStorageService} from '../auth/token-storage.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  public authority: string;
  form: any = {};
  failed = false;
  items: Item[] = [];
  editField: string;

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Name', 'Category', 'Price'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor( private apiService: ApiService, private tokenStorage: TokenStorageService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthority();
      console.log('top-bar init: ' + this.authority);
    }
    this.getAllItems();
    /*for (let i = 1; i <= this.items.length; i++) {
      this.elements.push({
        name: i.toString(),
        category: 'Wpis' + (Math.floor(Math.random() * i * 10 )).toString(),
        price: 'Last' + (Math.floor(Math.random() * i * 10 )).toString()});
    }*/
    for (let i = 1; i <= 25; i++) {
      this.elements.push({
        name: i.toString(),
        category: 'Wpis' + (Math.floor(Math.random() * i * 10 )).toString(),
        price: 'Last' + (Math.floor(Math.random() * i * 10 )).toString()});
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  public getAllItems() {
    this.apiService.getAllItems().subscribe(
      res => {
        this.items = res;
      },
      err => {
        alert("get error");
      }
    );
  }
  updateName(item: Item, event: any) {
    console.log(item.name + item.price + item.category);
    console.log( event.target.textContent);
    const modifiedItem: Item = {
      itemId: item.itemId,
      name: event.target.textContent,
      price: item.price,
      category: item.category
    };
    this.apiService.updateItem(modifiedItem).subscribe(
      data => {
        console.log(data);
      },
      error  => {
        console.log(error);
      }
    );
  }
  updateCategory(item: Item, event: any) {
    console.log(item.name + item.price + item.category);
    console.log( event.target.textContent);

    const modifiedItem: Item = {
      itemId: item.itemId,
      name: item.name,
      price: item.price,
      category: event.target.textContent
    };
    this.apiService.updateItem(modifiedItem).subscribe(
      data => {
        console.log(data);
      },
      error  => {
        console.log(error);
      }
    );
  }
  updatePrice(item: Item, event: any) {
    console.log(item.name + item.price + item.category);
    console.log( event.target.textContent);

    const modifiedItem: Item = {
      itemId: item.itemId,
      name: item.name,
      price: event.target.textContent,
      category: item.category
    };
    this.apiService.updateItem(modifiedItem).subscribe(
      data => {
        console.log(data);
      },
      error  => {
        console.log(error);
      }
    );
  }

  remove(id: number) {
    console.log('deleet');
    this.apiService.deleteItem(id);
    this.items = this.items.filter(h => h.itemId !== id);
  }

  add(addForm: NgForm) {
    const item: Object = {
      name: this.form.name,
      price: this.form.price,
      category: this.form.category
    };
    this.apiService.postItem(item).subscribe(
      data => {
        this.items.push(data);
      },
      error  => {
        console.log(error);
      }
    );
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}

