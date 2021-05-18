import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceHomeService {

  constructor(private http: HttpClient) { }

  createCredit(objCredit): Observable<any>{
    return this.http.put<any>(environment.url + environment.credit + environment.create, objCredit);
  }

  getCredits(): Observable<any>{
    return this.http.get<any>(environment.url + environment.credit + '1');
  }

  updateCredit(objCredit): Observable<any>{
    return this.http.put(environment.url + environment.credit + environment.update, objCredit)
  }

  deleteCredits(id): Observable<any>{
    return this.http.delete<any>(environment.url + environment.credit + id);
  }

 

}
