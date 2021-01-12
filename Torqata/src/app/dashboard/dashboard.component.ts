import { Component, OnInit, ViewChild } from '@angular/core';
//http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { CountryService } from 'src/shared-services/countryservice';
import { trigger, state, style, transition, animate } from '@angular/animations';


//table
import { Customer, Representative } from 'src/shared-services/customer';
import { CustomerService } from 'src/shared-services/customerservice';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CountryService, MessageService]
})
export class DashboardComponent implements OnInit {
  errorMessage;
  jsonData;

  //remote json datatable array
  jsonDataArray;

  //remote json datatable object
  jsonDataObject;

  //table
  customers: Customer[];
  selectedCustomers: Customer[];
  representatives: Representative[];
  statuses: any[];
  countries: any[];
  loading: boolean = true;
  @ViewChild('dt') table: Table;

  constructor(
    private countryService: CountryService,
    private customerService: CustomerService,
    private http: HttpClient,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {

    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular')
      .pipe(catchError(this.erroHandler))
      .subscribe(arrayData => {
        this.jsonDataArray = arrayData.results;
        console.log('data', this.jsonDataArray);
      }).unsubscribe

  }

  erroHandler(error: HttpErrorResponse) {
    console.log('error:', error.message);
    return throwError(error.message || 'server Error');
  }

  checkForErrors() {
    this.http.get<any>('httpss://api.npms.io/v2/search?q=scope:angular').subscribe({
      next: arrayData => {
        this.jsonDataArray = arrayData.results;
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'That was a terrible request, wow! ' });
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  checkForSuccess() {
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular')
      .pipe(catchError(this.erroHandler))
      .subscribe(arrayData => {
        if (arrayData.results.length > 1) { this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Nice request ! ' }); }
        this.jsonDataArray = arrayData.results;
        console.log('data', this.jsonDataArray);
      }).unsubscribe
  }

  ngOnInit(): void {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
    });

    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;
    });
  }


  //table
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day > 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }

}
