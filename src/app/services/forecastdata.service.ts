import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForecastdataService {
  jsonData;
  constructor() {
    this.jsonData = {};
  }
  setJSONData(val: object) {
    this.jsonData = val;
  }
  getJSONData() {
    return this.jsonData;
  }
}
