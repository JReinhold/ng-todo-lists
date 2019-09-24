import { Todo } from './Todo';

export class TodoList {
  private todos: Todo[] = [];

  public static create(title: string): TodoList {
    return new TodoList(title, 1);
  }
  protected constructor(
    public readonly title: string,
    public readonly id: number,
  ) {}
}
