import { Todo } from './Todo';
import { immutableSplice } from 'src/utils/array';

export class TodoList {
  private todos: Todo[] = [];

  public static create(title: string): TodoList {
    return new TodoList(title, Date.now());
  }

  public addTodo(title: string): void {
    this.todos = [...this.todos, Todo.create(title)];
  }

  public updateTodo(todo: Todo) {
    this.todos = immutableSplice(
      this.todos,
      this.todos.findIndex(t => t.created === todo.created),
      1,
      todo,
    );
  }

  public getTodos(): Todo[] {
    return this.todos;
  }

  protected constructor(
    public readonly title: string,
    public readonly created: number,
  ) {}
}
