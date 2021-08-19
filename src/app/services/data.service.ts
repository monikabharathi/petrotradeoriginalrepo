import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
