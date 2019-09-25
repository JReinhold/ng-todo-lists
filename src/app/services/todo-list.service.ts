import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';
import { Observable, Subject, of } from 'rxjs';
import { immutableSplice } from 'src/utils/array';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todoLists: TodoList[] = [TodoList.create('Initial List', 100)];
  $todoListsChange = new Subject<TodoList[]>();

  getTodoLists(): Observable<TodoList[]> {
    this.$todoListsChange.next(this.todoLists);
    return of(this.todoLists);
  }

  addTodoList(title: string): void {
    this.todoLists.push(TodoList.create(title));
    this.$todoListsChange.next(this.todoLists);
  }

  getTodoList(listCreated: number): TodoList {
    return this.todoLists.find(todoList => todoList.created === listCreated);
  }

  addTodoToList(title: string, listCreated: number): void {
    const todoListIndexToChange = this.todoLists.findIndex(
      todoList => todoList.created === listCreated,
    );
    const todoListToChange = this.todoLists[todoListIndexToChange];
    todoListToChange.addTodo(title);

    this.todoLists = immutableSplice(
      this.todoLists,
      todoListIndexToChange,
      1,
      todoListToChange,
    );
    this.$todoListsChange.next(this.todoLists);
  }

  updateTodoInList(nextTodo: Todo, listCreated: number): void {
    const todoListIndexToChange = this.todoLists.findIndex(
      todoList => todoList.created === listCreated,
    );
    const todoListToChange = this.todoLists[todoListIndexToChange];
    todoListToChange.updateTodo(nextTodo);

    this.todoLists = immutableSplice(
      this.todoLists,
      todoListIndexToChange,
      1,
      todoListToChange,
    );
    this.$todoListsChange.next(this.todoLists);
  }
}
