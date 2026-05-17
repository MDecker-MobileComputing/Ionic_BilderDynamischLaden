import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { EinstellungenService } from './einstellungen-service';
import { FlickrApiResponse } from './flickr-api-response';


/**
 * Diese Klasse kapselt die Logik für den Zugriff auf die Web–API von Flickr. 
 */
@Injectable({
  providedIn: 'root',
})
export class FlickerService {
  
  /** Basis-URL für Web-API von Flickr. */
  readonly FLICKR_API_URL = "https://www.flickr.com/services/rest/";


  /**
   * Konstruktor für *Dependency Injection*
   */
  constructor( private einstellungenService: EinstellungenService,
               private httpClient: HttpClient ) {}
   
  /**
   * Methode für die Suche nach einem Bild auf Flickr. Es wird ein zufällig ausgewähltes Bild zurückgegeben, 
   * das zum Suchbegriff passt.
   * 
   * @param suchbegriff Suchbegriff für Bild, z.B. "Brandenburger Tor"
   * 
   * @param apiKey API-Key für Web-API von Flickr (optional); wird für Test von neu eingegebenen API-Keys gesetzt;
   *               wenn nicht gesetzt, dann wird der API-Key aus den Einstellungen geladen
   * 
   * @returns Volle URL für ein Bild
   * 
   * @throws Fehler, wenn kein API-Key vorhanden ist oder die Web-API von Flickr nicht erreichbar ist
   */
  public async bildSuchen( suchbegriff: string, apiKey: string = "" ) : Promise<string> {

    if ( !apiKey ) {

      apiKey = await this.einstellungenService.holeApiKey();
    }

    const anzahlBilderProSeite = await this.einstellungenService.holeAnzahlBilderProSeite();

    const url = new URL( this.FLICKR_API_URL );
    url.searchParams.set( "method"        , "flickr.photos.search" );
    url.searchParams.set( "api_key"       , apiKey                 );
    url.searchParams.set( "text"          , suchbegriff            );
    url.searchParams.set( "format"        , "json"                 );
    url.searchParams.set( "per_page"      , anzahlBilderProSeite   );
    url.searchParams.set( "page"          , "1"                    );
    url.searchParams.set( "nojsoncallback", "1"                    );

    const urlString = url.toString();

    console.log( "URL für Web-API-Aufruf: " + urlString );

    const httpAntwortObservable = this.httpClient.get<FlickrApiResponse>( urlString );

    const antwort = await firstValueFrom( httpAntwortObservable );
    
    const anzahlBilder = Number( antwort?.photos?.total ?? 0 );
    console.log( "Anzahl gefundener Bilder: " + anzahlBilder );

    // für "Quarzmolch" wird kein einziges Bild gefunden
    if ( anzahlBilder == 0 ) {

      throw new Error( `Kein einziges  Bild gefunden für Suchbegriff: ${suchbegriff}` );      
    }
    
    // zufälliges Bild aus der Antwort auswählen
    const zufallsIndex = Math.floor( Math.random() * antwort.photos.photo.length );
    console.log( "Zufällig ausgewähltes Bild: " + zufallsIndex );
    const zufaelligesBild = antwort.photos.photo[ zufallsIndex ];

    const suffixGroesse = "z";
    // kein Suffix: Standardgröße, oft etwa 500 px lange Seite.
    // _m: kleine Version.
    // _z: mittlere Version, oft 640 px lange Seite.
    // _b: große Version, oft 1024 px lange Seite.
    // _o: Original, falls verfügbar.

    const bildUrl = `https://live.staticflickr.com/${zufaelligesBild.server}/${zufaelligesBild.id}_${zufaelligesBild.secret}_${suffixGroesse}.jpg`;
    return bildUrl;
  }

}
