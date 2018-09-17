import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Test} from '../domain/test';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getTest(): Observable<Test> {
    return this.http.get<Test>('test.json').pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}


