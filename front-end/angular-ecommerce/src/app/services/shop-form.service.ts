import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  stateUrl: string = 'http://localhost:8080/api/states';
  countryUrl: string = 'http://localhost:8080/api/countries';

  constructor(private httpClient: HttpClient) {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const monthList: number[] = [];

    for (let currentMonth = startMonth; currentMonth < 12; currentMonth++) {
      monthList.push(currentMonth);
    }
    return of(monthList);
  }

  getCreditCardYears(): Observable<number[]> {
    const startYear: number = new Date().getFullYear();
    const endYear = startYear + 10;
    const years: number[] = [];

    for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
      years.push(currentYear);
    }

    return of(years);
  }

  getCountries() {
    return this.httpClient
      .get<GetResponseCountries>(this.countryUrl)
      .pipe(
        map((response: GetResponseCountries) => response._embedded.countries)
      );
  }
  getStates(countryCode: string) {
    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchStatesUrl)
      .pipe(map((response: GetResponseStates) => response._embedded.states));
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
