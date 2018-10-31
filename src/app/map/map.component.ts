import { Component, OnInit } from '@angular/core';
import { Marker } from '../../models';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { LocationsService } from '../locations.service';
import { MapsService } from '../maps.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public lat: number;
  public lng: number;
  public zoom: number;

  public openedWindow: number;

  // public markers: Marker[] = this.locationService.getMarkers();

  public markers: Marker[] = [];


  constructor(
    private locationService: LocationsService,
    private mapApiLoader: MapsAPILoader,
    private mapsService: MapsService
  ) {
  }

  ngOnInit() {
    this.locationService.getMarkers2().subscribe((res: any[]) => {
      if (res) {
        res.forEach(item => {
          this.markers.push({
            facilityId: item.id,
            lat: Number(item.acf.geo_location.lat),
            lng: Number(item.acf.geo_location.lng),
            title: item.acf.title,
            icon: 'https://www.ftsgps.com/wp-content/uploads/2017/05/icon-location-100.png',
            draggable: false,
            street: item.acf.address.street,
            city: item.acf.address.city,
            state: item.acf.address.state,
            postalcode: item.acf.address.zip,
            email: item.acf.contacts.email,
            phone: item.acf.contacts.phone,
            website: 'http://blinkfitness.com',
            detail: 'InfoWindow content'
          });
        });
        console.log('map component -> this.markers ----->', this.markers);
      }
    });

    this.lat = this.mapsService.lat;
    this.lng = this.mapsService.lng;
    this.zoom = this.mapsService.zoom;

    this.setCurrentPosition();
    this.mapApiLoader.load();

    // Zoom to new location after search
    this.mapsService.newCoordinators.subscribe(
      (coords: { lat: number, lng: number, zoom: number }) => {
        if (coords) {
          this.lat = coords.lat;
          this.lng = coords.lng;
          this.zoom = coords.zoom;
          this.mapApiLoader.load();
        }
      }
    );

    // Open window after click on panel
    this.mapsService.openWindow.subscribe(
      index => {
        this.openedWindow = +index;
      }
    );
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`Clicked the marker: ${label || index}`);
    this.openedWindow = index;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = this.mapsService.lat = position.coords.latitude;
        this.lng = this.mapsService.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }

    // @Todo: resort the locations
  }

  isInfoWindowOpen(index: number) {
    return this.openedWindow === index;
  }
}
