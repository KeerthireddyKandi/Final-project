import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri:string = 'http://localhost:3000/budget';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public dataSource = {
    datasets:[
        {
            data: [],
            backgroundColor: [
              '#ffcd56',
              '#ffcd56',
              '#ffcd56',
              '#ffcd56',
              '#ff6384',
              '#ffcd56',
              '#ffcd56',
              '#ffcd56',
              '#ffcd56',
              '#ff6384',
            ],
            label: 'Budget Value',
        },
        {
          data: [],
          backgroundColor: [
            '#2ECC71',
            '#2ECC71',
            '#2ECC71',
            '#2ECC71',
            '#2ECC71',
            '#2ECC71',
          ],
          label: 'Expense Used ',
        },
    ],
    labels: []
  };
  public dataSource2 = {
    datasets:[
        {
            data: [],
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#2E4053',
              '#2ECC71',
              '#B7950B',
            ],
        }
    ],
    labels: []
  };


  constructor(private http: HttpClient) { }

  getchartdata(){
    return this.http.get(`${this.baseUri}`);
  }

  getBudgets() {
    return this.http.get(`${this.baseUri}`);
  }

  createBudget(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getBudget(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateBudget(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


  deleteBudget(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
