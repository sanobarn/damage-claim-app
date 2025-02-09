import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(message: string) {
    console.log('LoggerService:', message);
  }

  error(message: string) {
    console.error('LoggerService:', message);
  }
}
