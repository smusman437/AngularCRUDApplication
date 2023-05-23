import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/Services/todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos?: Todo[];
  currentTodo: Todo = {};
  currentIndex = -1;
  title = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos(): void {
    this.todoService.getAll()
      .subscribe({
        next: (data) => {
          data = data.splice(1, 10)
          this.todos = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTodos();
    this.currentTodo = {};
    this.currentIndex = -1;
  }

  setActiveTodo(todo: Todo, index: number): void {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentTodo = {};
    this.currentIndex = -1;

    this.todoService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.todos = data;
        },
        error: (e) => console.error(e)
      });
  }

}
