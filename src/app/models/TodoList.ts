import { Todo } from './Todo';
import { immutableSplice } from 'src/utils/array';

export class TodoList {
  private todos: Todo[] = [];

  public static create(title: string, created?: number): TodoList {
    return new TodoList(title, created || Date.now());
  }

  public addTodo(title: string): void {
    this.todos = [...this.todos, Todo.create(title)].sort(this.compareTodos);
  }

  public updateTodo(todo: Todo) {
    this.todos = immutableSplice(
      this.todos,
      this.todos.findIndex(t => t.created === todo.created),
      1,
      todo,
    ).sort(this.compareTodos);
  }

  /**
   * compare function that sorts completed todos first, then oldest todos
   */
  private compareTodos(thisTodo: Todo, otherTodo: Todo): number {
    // sort this first if this is completed, and the other isn't
    if (thisTodo.completed && !otherTodo.completed) {
      return -1;
    }
    // sort this last if this isn't completed, and the other is
    if (!thisTodo.completed && otherTodo.completed) {
      return 1;
    }
    // sort by creation date, oldest first
    return thisTodo.created.getTime() - otherTodo.created.getTime();
  }

  public getTodos(): Todo[] {
    return this.todos;
  }

  /**
   * builds a string that describes how many todos are in the list
   */
  public getListDescription(): string {
    if (!this.todos.length) {
      return '0 todos';
    }
    if (this.todos.every(todo => todo.completed)) {
      return 'All done! 🚀';
    }
    const numOfIncompleteTodos = this.todos.filter(todo => !todo.completed)
      .length;

    // don't have pluralis 'todos' when only one todo remaining
    if (numOfIncompleteTodos === 1) {
      return `1 todo to do`;
    }

    return `${numOfIncompleteTodos} todos to do`;
  }

  protected constructor(
    public readonly title: string,
    public readonly created: number,
  ) {}
}
