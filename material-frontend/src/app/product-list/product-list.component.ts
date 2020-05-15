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
export class ProductListComponent implements OnInit{

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

  constructor( private apiService: ApiService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthority();
      console.log('top-bar init: ' + this.authority);
    }
    this.getAllItems();

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();;
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
  }

  public getAllItems() {
    this.apiService.getAllItems().subscribe(
      res => {
        this.items = res;
        this.elements = res;
      },
      err => {
        alert(err.error.message);
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
        alert(error.error.message);
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
        alert(error.error.message);
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
        alert(error.error.message);
      }
    );
  }

  remove(id: number) {
    console.log('deleet');
    this.apiService.deleteItem(id);
    this.items = this.items.filter(h => h.itemId !== id);
  }

  add(addForm: NgForm, basicModal: any) {
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
        alert(error.error.message);
      }
    );
    basicModal.hide();
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}

