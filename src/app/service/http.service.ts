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

  getTest(option: string): Observable<Test> {
    const name = option === '1' ? 'test.json' : 'test2.json';
    return this.http.get<Test>(name).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}


