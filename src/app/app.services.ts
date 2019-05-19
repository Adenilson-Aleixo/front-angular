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
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/