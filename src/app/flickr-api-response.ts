/**
 * Antwortstruktur der Flickr-API für flickr.photos.search.
 * 
 * Beispiel für JSON-Antwort:
 * https://gist.github.com/MDecker-MobileComputing/fca4e8d121cc93fc3d592b78e2de8bf0
 */
export interface FlickrApiResponse {

  photos: FlickrPhotos;
  stat: string;
}

export interface FlickrPhotos {

  page: number;
  pages: number;
  perpage: number;
  total: number | string;
  photo: FlickrPhoto[];
}

export interface FlickrPhoto {
    
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}
