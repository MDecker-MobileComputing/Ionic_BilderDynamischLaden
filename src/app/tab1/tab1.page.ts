import { Component } from '@angular/core';

import { FlickerService } from '../flicker-service';


/**
 * Hauptseite für Abruf von Bildern von Flickr.
 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  /** Suchbegriff, der in Eingabefeld eingegeben wurde */
  public suchbegriffEingabe: string = "";

  /** URL von darzustellendem Bild */
  public bildUrl : string = "";

  /** Fehlermeldung, die in <ion-note> angezeigt wird */
  public fehlermeldung : string = "";


  /**
   * Konstruktor für *Dependency Injection*
   */
  constructor( private flickerService: FlickerService ) {}


  /**
   * Event-Handler für den Klick auf den Suchen-Button.
   */
  public async onSuchenButton() {

    this.fehlermeldung = "";
    
    const neuerSuchbegriff = this.suchbegriffEingabe.trim();
    if ( neuerSuchbegriff.length == 0 ) {

      this.fehlermeldung = "Bitte geben Sie einen Suchbegriff ein.";
      return;
    }

    this.fehlermeldung = "Not implemented yet ...";

    //this.imageUrl = "https://live.staticflickr.com/65535/55271017041_50286238af_z.jpg";

  }


  /**
   * Event-Handler für den Klick auf den Zurück-Suchen-Button.
   */
  public onZuruecksetzenButton() {

    this.suchbegriffEingabe = "";
    this.bildUrl            = "";
    this.fehlermeldung      = "";
  }

}
