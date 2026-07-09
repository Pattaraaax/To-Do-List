import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todoitems';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  create(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  update(id: number, todo: Todo) {
    return this.http.put<Todo>(this.apiUrl + '/' + id, todo);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
