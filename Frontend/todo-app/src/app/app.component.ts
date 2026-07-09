import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  title = '';           
  editingId: number | null = null; 

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAll().subscribe(data => {
      this.todos = data;
    });
  }

  // Add Edit
  save() {
    if (!this.title.trim()) return;

    if (this.editingId === null) {
      // (Create)
      const newTodo = { id: 0, title: this.title, isCompleted: false };
      this.todoService.create(newTodo).subscribe(() => {
        this.title = '';
        this.loadTodos();
      });
    } else {
      //  (Update)
      const updated = { id: this.editingId, title: this.title, isCompleted: false };
      this.todoService.update(this.editingId, updated).subscribe(() => {
        this.title = '';
        this.editingId = null;
        this.loadTodos();
      });
    }
  }

  edit(todo: Todo) {
    this.editingId = todo.id;
    this.title = todo.title;
  }

  cancelEdit() {
    this.editingId = null;
    this.title = '';
  }

  toggleCompleted(todo: Todo) {
    const updated = { ...todo, isCompleted: !todo.isCompleted };
    this.todoService.update(todo.id, updated).subscribe(() => {
      this.loadTodos();
    });
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe(() => {
      this.loadTodos();
    });
  }
}