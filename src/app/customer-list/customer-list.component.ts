import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customers: Customer[] = [];
  public show_add_new_form: boolean = true;
  public new_customer: Customer = new Customer("","","","");
  public please_wait: boolean = false;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {

    this.please_wait = true;

    this.service.getCustomers()
    .then((returnVal) => {
      this.customers = returnVal;
      this.please_wait = false;
    })
    .catch(err => {
      console.log("Axios err: ", err)
      this.please_wait = false;
    })
  }
  
  showHideForm(): void {
    this.show_add_new_form = !this.show_add_new_form;
  }

  cancelCustomer(): void {
    this.new_customer = new Customer("","","","");
    this.showHideForm();
  }

  createCustomer(): void {
    
    if (this.new_customer['last_name'].length > 100 || this.new_customer['first_name'].length > 100 || this.new_customer['email'].indexOf("@") == -1) {
      alert("you did something dumb");
      return;
    }

    this.please_wait = true;

    this.service.createCustomer(this.new_customer)
    .then((returnVal) => {
      this.customers.push(returnVal);
      this.cancelCustomer();
      this.please_wait = false;
    })
    .catch(err => {
      console.log("Axios err: ", err);
      this.please_wait = false;
    })
  }

  deleteCustomer(customer:Customer): void {
    this.please_wait = true;

    this.service.deleteCustomer(customer)
    .then((returnVal) => {
      this.customers.forEach((value,index)=>{
        if(value['_id']==customer['_id']) this.customers.splice(index,1);
        this.please_wait = false;
      });
    })
    .catch(err => {
      console.log("Axios err: ", err);
      this.please_wait = false;
    })
  }

}
