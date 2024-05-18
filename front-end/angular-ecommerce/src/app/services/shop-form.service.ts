import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  constructor() {}

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
}
