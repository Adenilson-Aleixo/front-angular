import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './user';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {
  userUrl = 'http://localhost:8080/user';  // URL to web api  
  private handleError: HandleError;

  constructor(
    private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res.content;
    return body || { };
  }

  /** GET users from the server */
  getUsers (): Observable<any> {
    return this.http.get(this.userUrl + '/all')
    .pipe(map(this.extractData));    
  }

  deleteUser (user: User): Observable<{}> {
    const url = `${this.userUrl}/${user.nuCpf}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        // catchError(this.handleError('deleteUser'))
      );
  }

  disableUser (user: User): Observable<{}> {
    const options = user.icSituation === "A" ? false : true;
    const url = `${this.userUrl}/${user.nuCpf}?onlyEnable=${options}`;

    httpOptions.headers =
      httpOptions.headers.set('Access-Control-Allow-Origin', '*');

    return this.http.put(url, {}, httpOptions)
      .pipe(
        // catchError(this.handleError('disableUser'))
      );
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        // catchError(this.handleError('addUser', user))
      );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/