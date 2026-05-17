import { Component, OnInit } from '@angular/core';

import { EinstellungenService } from '../einstellungen-service';
import { FlickerService } from '../flicker-service';


/**
 * Tab-Seite für Einstellungen.
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  /** API-Key für Web–API von Flickr */
  public apiKey: string = "";

  /** Erfolgs- oder Fehlermeldung  */
  public meldungApiKey: string = "";

  /** Ist genau dann `true`, wenn `meldungApiKey` eine Fehlermeldung ist. */
  public meldungIstFehler: boolean = false;

  /** Anzahl der Bilder pro Seite mit Suchergebnissen in den Einstellungen. */ 
  public anzahlBilderProSeite: number = 25;


  /**
   * Konstruktor für *Dependency Injection*
   */
  constructor( private einstellungenService: EinstellungenService,
               private flickerService      : FlickerService ) {}


  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Seite geladen wird. Hier wird der 
   * gespeicherte API-Key aus den Einstellungen geladen und in `apiKey` gesetzt, 
   * damit er im Eingabefeld angezeigt wird.
   */
  async ngOnInit() {

    const gespeicherterApiKey = await this.einstellungenService.holeApiKey();
    if ( gespeicherterApiKey ) {

      this.apiKey = gespeicherterApiKey;
    }
  }
   

  /**
   * Event-Handler für Klick auf Button "API-Key prüfen".
   */
  public async onApiKeyPruefenButton() {

    this.meldungApiKey    = "";
    this.meldungIstFehler = false;

    if ( this.apiKey.trim() === "" ) {

      this.meldungApiKey = "Bitte geben Sie einen API-Key ein.";
      this.meldungIstFehler = true;
      return;
    }

    // Regex-Validierung für Flickr API-Key (32 alphanumerische Zeichen)
    const flickrApiKeyRegex = /^[a-zA-Z0-9]{32}$/;
    if ( !flickrApiKeyRegex.test( this.apiKey ) ) {

      this.meldungApiKey    = "Der API-Key muss genau 32 alphanumerische Zeichen enthalten.";
      this.meldungIstFehler = true;
      return;
    }

    try {

      // Dummy-Aufruf, um zu prüfen, ob API-Key funktioniert und Web-API von Flickr erreichbar ist
      const bildUrl = await this.flickerService.bildSuchen( "Berlin", this.apiKey );

      console.log( "Testaufruf erfolgreich, Bild-URL: " + bildUrl );

      await this.einstellungenService.setzeApiKey( this.apiKey)
      this.meldungApiKey    = "API-Key erfolgreich gespeichert.";
      this.meldungIstFehler = false;

    }
    catch ( fehler ) {

      console.error( "Fehler beim Zugriff auf Web-API von Flickr: ", fehler );

      this.meldungApiKey    = "API-Key funktioniert nicht oder Web-API von Flickr ist nicht erreichbar.";
      this.meldungIstFehler = true;
    }
  }


  /**
   * Event-Handler für Änderung der Anzahl der Bilder pro Seite mit Suchergebnissen. 
   * Es wird die neue Anzahl in den Einstellungen gespeichert.
   */
  public async onAnzahlBilderProSeiteGeaendert() {

    this.einstellungenService.setzeAnzahlBilderProSeite( 
                                  this.anzahlBilderProSeite );
  }

}
