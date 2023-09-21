import { Injectable } from '@angular/core';  
import { createMask } from '@ngneat/input-mask';


@Injectable({
  providedIn: 'root'
})
export class MaskService {

  public timeMask: any = createMask('99:99');
  constructor(
    
  ) {  
  }

}
