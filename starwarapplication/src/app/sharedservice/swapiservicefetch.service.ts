import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class SwapiservicefetchService {

  constructor(private http:HttpClient) { }
  allpeopledata():Observable<any>{
  return this.http.get("https://swapi.dev/api/people/");
  }
  planetdataperticular(data:any):Observable<any>{
    return this.http.get(data);
  }
  allmoviesnamedropdown():Observable<any>{
    return this.http.get('https://swapi.dev/api/films/')
  }
  allspeciesnamedropdown():Observable<any>{
    return this.http.get('https://swapi.dev/api/species/')
  }
  allvehiclenamedropdown():Observable<any>{
    return this.http.get('https://swapi.dev/api/vehicles/')
  }
  allstarshipsnamedropdown():Observable<any>{
    return this.http.get('https://swapi.dev/api/starships/')
  }
}
