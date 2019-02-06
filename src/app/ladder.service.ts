import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LadderService {
  constructor() { }

  public loadData() {
    return [
      { name: 'austin', homeCourt: 'Fieldstone', email: 'test@test.com', phone: '555-555-5555' },
      { name: 'trilla', homeCourt: 'The beach', email: 'test@test.com', phone: '555-555-5555' },
      { name: 'nicole', homeCourt: 'Ashebrooke', email: 'test@test.com', phone: '555-555-5555' },
      { name: 'william', homeCourt: 'Brookstone', email: 'test@test.com', phone: '555-555-5555' }
    ]

  }
}
