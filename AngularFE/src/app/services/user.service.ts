// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface User {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   // private baseUrl = 'http://localhost:8900/api/users';
//    private baseUrl = 'http://localhost:8978/api/user';

//   constructor(private http: HttpClient) {}

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseUrl);
//   }

//   login(email: string, password: string): Observable<User> {
//   return this.http.post<User>(`${this.baseUrl}/login`, { email, password });
// }


//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.baseUrl}/${id}`);
//   }

//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(this.baseUrl, user);
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.baseUrl}/${id}`, user);
//   }

//   deleteUser(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  loginUser(email: string, password: string): Observable<User> {
  return this.httpClient.post<User>(
    `${this.apiURL}/api/user/login`,
    { email, password },
    this.httpOptions
  ).pipe(
    catchError(this.errorHandler)
  );
}


  private apiURL = 'http://localhost:8773';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<any>(`${this.apiURL}/api/user`).pipe(
      // map(response => response.data), // unwrap ResponseStructure
      catchError(this.errorHandler)
    );
  }

  // Create a user
  createUser(user: User): Observable<User> {
    return this.httpClient.post<any>(
      `${this.apiURL}/api/user`,
      JSON.stringify(user),
      this.httpOptions
    ).pipe(
      // map(response => response.data),
      catchError(this.errorHandler)
    );
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<any>(`${this.apiURL}/api/user/${id}`).pipe(
      // map(response => response.data),
      catchError(this.errorHandler)
    );
  }

  // Update a user
  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<any>(
      `${this.apiURL}/api/user/${id}`,
      JSON.stringify(user),
      this.httpOptions
    ).pipe(
      // map(response => response.data),
      catchError(this.errorHandler)
    );
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
  return this.httpClient.delete<void>(
    `${this.apiURL}/api/user/${id}`,
    this.httpOptions
  ).pipe(
    // map(() => undefined), // return undefined instead of null
    catchError(this.errorHandler)
  );
}


  // Error handler
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}