import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from "./user.service";
import {jsonIgnoreReplacer} from "json-ignore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiPath: string = "https://ADRESS/api/";

  constructor(private http: HttpClient, private userService: UserService) { }

  get(destination: string): Observable<any> {
    return this.http.get<any>(this.apiPath + destination, this.getRequestOptions())
  }

  delete(destination: string): Observable<Object> {
    return this.http.delete(this.apiPath + destination, this.getRequestOptions())
  }

  post(destination: string, body: any): Observable<any> {
    body = (JSON.stringify(body, jsonIgnoreReplacer));
    return this.http.post<any>(this.apiPath + destination, body, this.getRequestOptions());
  }

  put(destination: string, body: any): Observable<Object> {
    return this.http.put(this.apiPath + destination, body, this.getRequestOptions())
  }

  private getRequestOptions(): Object {
    let headers : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    if (this.userService.getJwtToken() != undefined) {
      headers = headers.append('Authorization', "Bearer " + this.userService.getJwtToken().replace("\"", ""))
    }

    let requestOptions: Object = {
      observe: 'response',
      responseType: 'json',
      headers: headers
    };
    return requestOptions;
  }
}
