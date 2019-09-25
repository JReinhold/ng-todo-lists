import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoList } from 'src/app/models/TodoList';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef<
    HTMLInputElement
  >;
  private showCompletedTodos = false;
  private todoList: TodoList;
  private todoListSubscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoListService: TodoListService,
    private titleService: Title,
  ) {
    const todoListCreatedAt = Number(
      this.activatedRoute.snapshot.paramMap.get('created'),
    );
    this.todoList = this.todoListService.getTodoList(todoListCreatedAt);
  }

  get todos(): Todo[] {
    return this.todoList.getTodos();
  }

  addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoToList(title, this.todoList.created);
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoListService.updateTodoInList(todo, this.todoList.created);
  }

  changeShowCompleted(showCompleted: boolean) {
    this.showCompletedTodos = showCompleted;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { showCompleted },
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.showCompletedTodos = queryParams.get('showCompleted') === 'true';
    });
    this.todoListSubscription.add(
      this.todoListService.getTodoLists().subscribe(todoLists => {
        this.todoList = todoLists.find(
          todoList => todoList.created === this.todoList.created,
        );
        this.titleService.setTitle(this.todoList.title);
      }),
    );
    this.todoListSubscription.add(
      this.todoListService.$todoListsChange.subscribe(todoLists => {
        this.todoList = todoLists.find(
          todoList => todoList.created === this.todoList.created,
        );
      }),
    );
  }

  ngOnDestroy() {
    this.todoListSubscription.unsubscribe();
  }
}
