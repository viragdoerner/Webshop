import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input()id: number;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  public submitForm() {
    this.activeModal.close(this.myForm.value);
  }


  ngOnInit(): void {
  }

  public createForm() {
    this.myForm = this.formBuilder.group({
      name: '',
      amount: ''
    });
  }


}
