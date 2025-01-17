import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';
import { Observable, Subject, of } from 'rxjs';
import { immutableSplice } from 'src/utils/array';
import { Todo } from '../models/Todo';

/**
 * The service that keeps track of all todo lists, and their todos
 * The $todoListsChange will update whenever the list of lists changes, and when a todolist's todos changes
 */
@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  // we start with a single todolist, to make it possible to reload the page at /list/100, to test the showComplete query parameter
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
