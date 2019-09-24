import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { immutableSplice } from 'src/utils/array';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef<
    HTMLInputElement
  >;
  private showCompletedTodos = false;
  private todos: Todo[];
  private todoListCreatedAt: number;

  constructor(
    private route: ActivatedRoute,
    private todoListService: TodoListService,
  ) {
    this.todoListCreatedAt = Number(
      this.route.snapshot.paramMap.get('created'),
    );
  }

  getTodos() {
    this.todos = this.todoListService
      .getTodoList(this.todoListCreatedAt)
      .getTodos();
  }

  addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoToList(title, this.todoListCreatedAt);
    this.getTodos();
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoListService.updateTodoInList(todo, this.todoListCreatedAt);
    this.getTodos();
  }

  ngOnInit() {
    this.getTodos();
  }
}
