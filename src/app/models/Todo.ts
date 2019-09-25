/**
 * The class that represents a Todo, in a Todo List
 * Each Todo has a title, a creation time, and a completed status
 */
export class Todo {
  public static create(title: string): Todo {
    return new Todo(title, false, new Date());
  }

  protected constructor(
    public readonly title: string,
    public readonly completed: boolean,
    public readonly created: Date,
  ) {}

  private toggleCompleted(): Todo {
    return new Todo(this.title, !this.completed, this.created);
  }
}
