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
  private todos: Todo[];
  private todoListCreatedAt: number;
  private todoListSubscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoListService: TodoListService,
  ) {
    this.todoListCreatedAt = Number(
      this.activatedRoute.snapshot.paramMap.get('created'),
    );
  }

  addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodoToList(title, this.todoListCreatedAt);
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoListService.updateTodoInList(todo, this.todoListCreatedAt);
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
        this.todos = todoLists
          .find(todoList => todoList.created === this.todoListCreatedAt)
          .getTodos();
      }),
    );
    this.todoListSubscription.add(
      this.todoListService.$todoListsChange.subscribe(todoLists => {
        this.todos = todoLists
          .find(todoList => todoList.created === this.todoListCreatedAt)
          .getTodos();
      }),
    );
  }

  ngOnDestroy() {
    this.todoListSubscription.unsubscribe();
  }
}
