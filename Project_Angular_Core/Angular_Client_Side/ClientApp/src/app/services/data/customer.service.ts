import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/data/constants';
import { Customer } from 'src/app/models/data/customer';
import { CustomerAndSaleDetailsViewModel } from 'src/app/models/data/view-models/customer-and-sale-details-view-model';
import { CustomerViewModel } from 'src/app/models/data/view-models/customer-view-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${apiUrl}/Customers`);
  }
  getVM():Observable<CustomerViewModel[]>{
    return this.http.get<CustomerViewModel[]>(`${apiUrl}/Customers/VM`);
  }
  getWithItems(id:number):Observable<CustomerAndSaleDetailsViewModel>{
    return this.http.get<CustomerAndSaleDetailsViewModel>(`${apiUrl}/Customers/${id}/OI`)
  }
  insert(data:Customer):Observable<Customer>{
    return this.http.post(`${apiUrl}/Customers`, data)
  }
  update(data:Customer):Observable<any>{
    return this.http.put<any>(`${apiUrl}/CustomersContext/VM/${data.customerID}`, data)
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Orders/${id}`)
  }
}
