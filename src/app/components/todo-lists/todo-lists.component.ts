import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  @ViewChild('listInput', { static: false }) listInput: ElementRef<
    HTMLInputElement
  >;
  private todoLists: TodoList[] = [];

  constructor() {}

  addTodoList(title: string): void {
    if (!title) {
      return;
    }
    this.todoLists = [...this.todoLists, TodoList.create(title)];
    this.listInput.nativeElement.value = '';
  }

  ngOnInit() {}
}
