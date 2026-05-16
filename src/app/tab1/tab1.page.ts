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
    
    const suchbegriffTrimmed = this.suchbegriffEingabe.trim();
    if ( suchbegriffTrimmed.length == 0 ) {

      this.fehlermeldung = "Bitte geben Sie einen Suchbegriff ein.";
      return;
    }

    try {

      this.bildUrl = await this.flickerService.bildSuchen( suchbegriffTrimmed );
    }
    catch ( fehler ) {

      const fehlermeldung = `Fehler beim Abruf von Bild von Flickr: ${fehler}`;
      console.error( fehlermeldung );
      this.fehlermeldung = fehlermeldung;
    }    
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
