import { Injectable } from '@angular/core';
import { Customer } from './customer';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: Customer[] = [];

  constructor() { }

  getCustomers() {
    console.log("get customers called!")

    return axios.get("http://localhost:8080/api/customers")
    .then((response) => {
        console.log('server response:' + response.data)
        this.customers = response.data;
        return this.customers;
    });
  }


}
