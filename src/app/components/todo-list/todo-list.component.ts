import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { immutableSplice } from 'src/utils/array';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef<
    HTMLInputElement
  >;
  private todoList: Todo[] = [];

  private showCompletedTodos = false;

  get todos(): Todo[] {
    return this.todoList;
  }

  addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoList = [...this.todoList, Todo.create(title)];
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoList = immutableSplice(
      this.todoList,
      this.todoList.findIndex(t => t.created === todo.created),
      1,
      todo,
    );
  }
}
