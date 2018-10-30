import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapsService {

  public lat: number = 40.74665905668922;
  public lng: number = -73.98781004001466;
  public zoom: number = 12;

  public newCoordinators = new Subject();

  public openWindow = new Subject();

  constructor() { }

}
