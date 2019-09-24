import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoListsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TodoListsComponent },
      { path: 'list/:listId', component: TodoListComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
