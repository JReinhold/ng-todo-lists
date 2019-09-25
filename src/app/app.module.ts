import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListOfTodoListsComponent } from './components/list-of-todo-lists/list-of-todo-lists.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, ListOfTodoListsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListOfTodoListsComponent },
      { path: 'list/:created', component: TodoListComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
