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

/**
 * The component that shows a todo list
 */
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
  // this is synced with the query param
  private showCompletedTodos = false;
  private todoList: TodoList;
  private subscriptions = new Subscription();

  get todos(): Todo[] {
    return this.todoList.getTodos();
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoListService: TodoListService,
    private titleService: Title,
  ) {}

  private addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoToList(title, this.todoList.created);
    this.todoInput.nativeElement.value = '';
  }

  private updateTodo(todo: Todo) {
    this.todoListService.updateTodoInList(todo, this.todoList.created);
  }

  /**
   * sets local boolean on showComplete change, as well as updates the query param
   */
  private changeShowCompleted(showCompleted: boolean) {
    this.showCompletedTodos = showCompleted;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { showCompleted },
    });
  }

  ngOnInit() {
    const todoListCreatedAt = Number(
      this.activatedRoute.snapshot.paramMap.get('created'),
    );

    // subscribe to changes in 'showComplete' query param
    this.subscriptions.add(
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.showCompletedTodos = queryParams.get('showCompleted') === 'true';
      }),
    );
    // get todo list from todoListService
    this.subscriptions.add(
      this.todoListService.getTodoLists().subscribe(todoLists => {
        this.todoList = todoLists.find(
          todoList => todoList.created === todoListCreatedAt,
        );
        this.titleService.setTitle(this.todoList.title);
      }),
    );
    // subscripe to todoList changes in todoListService
    this.subscriptions.add(
      this.todoListService.$todoListsChange.subscribe(todoLists => {
        this.todoList = todoLists.find(
          todoList => todoList.created === todoListCreatedAt,
        );
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
