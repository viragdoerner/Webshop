import {Component, OnInit} from '@angular/core';
//import { products } from '../products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Item} from './model/item';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from "../form-modal/form-modal.component";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  validatingForm: FormGroup;

  //products = products;
  products: Item[] = [];
  private productsUrl = 'api/items';  // URL to web api
  constructor(
    private apiService : ApiService,
    private modalService: NgbModal) { }




  updateItem(item : Item) {
    //window.alert('The items status has changed!');
    this.apiService.updateItem(item).subscribe(
      res => {
        //location.reload();
      },
      err => {
        alert(" put error");
      }
    );
  }

    public getAllItems(){
      this.apiService.getAllItems().subscribe(
         res => {
          this.products = res;
        },
         err => {
           alert("get error");
        }
     );
    }



  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
      //el kéne kuldeni backendnek
      this.apiService.postItem(result).subscribe(
        res => {
          location.reload();
        },
        err => {
          alert(" post error");
        }
      )


    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  /** GET items from the server
  getAllItems (): Observable<Item[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  */

}

