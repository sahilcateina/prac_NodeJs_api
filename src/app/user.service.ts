import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

   // Fetch all users
   getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new user
  addUser(user: { name: string; email: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

   // Update a user
  editUser(id: number, user: { name: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
}


  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
