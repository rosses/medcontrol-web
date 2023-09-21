import { Injectable } from '@angular/core';  
import { createMask } from '@ngneat/input-mask';


@Injectable({
  providedIn: 'root'
})
export class DummyService {

  public people: any = [];
  constructor(
    
  ) {  

    this.people.push({
      cardcode:   '9582360-2',
      name:       'FELIPE',
      lastname:   'CASANOVA',
      lastname2:  'MOLINA',
      phone:      '',
      phone2:     '',
      email:      '',
      stage:      'enproceso',
      stageName:  'CONSULTAS',
      health:     'FONASA',
      lastObs:    '',
      dates: [{
        date: '21/09/23',
        time: '18:30',
        confirmed: false,
        triage: {
          weight: 0,
          height: 0,
          sistolic: 0,
          diastolic: 0,
          temp: 0
        }
      }]
    });

    this.people.push({
      cardcode:   '7710250-9',
      name:       'ANDREA',
      lastname:   'SALINAS',
      lastname2:  'JEREZ',
      phone:      '',
      phone2:     '',
      email:      '',
      stage:      'reagendar',
      stageName:  'PREOPERATORIO',
      health:     'COLMENA',
      lastObs:    'FALTA ECG',
      dates: [{
        date: '21/09/23',
        time: '18:45',
        confirmed: true,
        triage: {
          weight: 84,
          height: 168,
          sistolic: 90,
          diastolic: 110,
          temp: 37.4
        }
      }]
    });
  }

}
