import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LadderService {
  constructor() { }

  public loadData() {
    return [
      { firstName: 'austin', lastName: 'Smith', homeCourt: 'Fieldstone', email: 'test@test.com', phone: '555-555-5555' },
      { firstName: 'trilla', lastName: 'Smith', homeCourt: 'The beach', email: 'test@test.com', phone: '555-555-5555' },
      { firstName: 'nicole', lastName: 'Smith', homeCourt: 'Ashebrooke', email: 'test@test.com', phone: '555-555-5555' },
      { firstName: 'william', lastName: 'Smith', homeCourt: 'Brookstone', email: 'test@test.com', phone: '555-555-5555' }
    ]

  }
}
