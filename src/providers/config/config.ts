import { Injectable } from '@angular/core';
let configKeyName = "config";
@Injectable()
export class ConfigProvider {
  // private config = {
  //   showSlide: false,
  //   name: '',
  //   username: ''
  // }
  constructor() {

  }
  //Recupera Dados do Local Storage
  getConfigData(): any {
    return localStorage.getItem(configKeyName) || null;
  }
  //Seta Dados do Local Storage

  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: showSlide ? showSlide : false,
      name: name ? name : '',
      username: username ? username : ''
    }
    localStorage.setItem(configKeyName, JSON.stringify(config));
  }
}
