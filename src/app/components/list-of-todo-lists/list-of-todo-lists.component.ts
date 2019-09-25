import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-of-todo-lists',
  templateUrl: './list-of-todo-lists.component.html',
  styleUrls: ['./list-of-todo-lists.component.scss'],
})
export class ListOfTodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('listInput', { static: false }) listInput: ElementRef<
    HTMLInputElement
  >;
  private todoLists: TodoList[] = [];
  private todoListSubscription = new Subscription();

  constructor(
    private todoListService: TodoListService,
    private titleService: Title,
  ) {}

  addTodoList(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoList(title);
    this.listInput.nativeElement.value = '';
  }

  ngOnInit() {
    this.titleService.setTitle('Not Another Todo App');

    this.todoListSubscription.add(
      this.todoListService.getTodoLists().subscribe(todoLists => {
        this.todoLists = todoLists;
      }),
    );
    this.todoListSubscription.add(
      this.todoListService.$todoListsChange.subscribe(todoLists => {
        this.todoLists = todoLists;
      }),
    );
  }

  ngOnDestroy() {
    this.todoListSubscription.unsubscribe();
  }
}
