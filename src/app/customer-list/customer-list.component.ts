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

  constructor(private service: CustomerService) { }

  ngOnInit(): void {

    this.service.getCustomers()
    .then((returnVal) => {
      this.customers = returnVal;
    })
    .catch(err => console.log("Axios err: ", err))
 }

}
