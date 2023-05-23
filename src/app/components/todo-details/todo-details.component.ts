import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/Services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTodo: Todo = {
    title: '',
    completed: false
  };

  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTodo(this.route.snapshot.params["id"]);
    }
  }

  getTodo(id: string): void {
    this.todoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTodo = data;
        },
        error: (e) => console.error(e)
      });
  }

  updateStatus(status: boolean): void {
    const data = {
      title: this.currentTodo.title,
      completed: status
    };

    this.message = '';

    this.todoService.update(this.currentTodo.id, data)
      .subscribe({
        next: (res) => {
          this.currentTodo.completed = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTodo(): void {
    this.message = '';

    this.todoService.update(this.currentTodo.id, this.currentTodo)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/todos']);
        },
        error: (e) => console.error(e)
      });
  }

}
