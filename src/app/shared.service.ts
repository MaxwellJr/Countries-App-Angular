import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from './country';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIURL: string = 'http://localhost:51595/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Request returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again with correct country name.');
  }

  searchCountry(countryName: string): Observable<Country[]> {
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${countryName}?fields=name,cca2,capital,region,population,area`)
    .pipe(catchError(this.handleError));
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.APIURL + '/database', country);
  }

  deleteCountry(cca2: string) {
    return this.http.delete(this.APIURL + '/database/' + cca2)
  }

  getDataTable(): Observable<Country[]> {
    return this.http.get<Country[]>(this.APIURL + '/database')
  }
}
