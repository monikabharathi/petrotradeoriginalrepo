import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassdataService {

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

  makeEmty() {
    this.jsonData = {};
    return this.jsonData;
  }
}
