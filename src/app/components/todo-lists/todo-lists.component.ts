import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { TodoListService } from 'src/app/services/todo-list.service';

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

  constructor(private todoListService: TodoListService) {}

  addTodoList(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoList(title);
    this.listInput.nativeElement.value = '';
  }

  ngOnInit() {
    this.todoListService.getTodoLists().subscribe(todoLists => {
      this.todoLists = todoLists;
    });
    this.todoListService.$todoListsChange.subscribe(todoLists => {
      this.todoLists = todoLists;
    });
  }
}
