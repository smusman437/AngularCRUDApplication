import { Component } from '@angular/core';
import { TodoService } from 'src/app/Services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {

  todo: Todo = {
    title: '',
    completed: false
  };
  submitted = false;

  constructor(private todoService: TodoService) { }

  saveTodo(): void {
    const data = {
      title: this.todo.title,
    };

    this.todoService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTodo(): void {
    this.submitted = false;
    this.todo = {
      title: '',
      completed: false
    };
  }


}
