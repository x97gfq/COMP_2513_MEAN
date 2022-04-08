import { Injectable } from '@angular/core';
import { Customer } from './customer';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers() {
    console.log("get customers called!")

    return axios.get("http://localhost:8080/api/customers")
    .then((response) => {
        console.log('server response:' + response.data)
        return response.data;
    });
  }

  createCustomer(new_customer:Customer) {
    console.log("create customer caled!")

    //delete the empty property, otherwise mongodb will complain (trying to insert empty/dupe key)
    delete new_customer['_id'];

    return axios.post("http://localhost:8080/api/customers", new_customer)
    .then((response) => {
      console.log("server response: " + response.data)
      return response.data;
    })
  }

  saveCustomer(customer:Customer) {
    console.log("save customer caled!")

    let customer_data = { customer: customer };

    return axios.put("http://localhost:8080/api/customers", customer_data)
    .then((response) => {
      console.log("server response: " + response.data)
      return response.data;
    })
  }
  
  deleteCustomer(customer:Customer) {
    console.log(customer);
    return axios.delete("http://localhost:8080/api/customers/" + customer['_id'])
    .then((response) => {
      console.log("server response: " + response.data)
      return response.data;
    })
  }

}
