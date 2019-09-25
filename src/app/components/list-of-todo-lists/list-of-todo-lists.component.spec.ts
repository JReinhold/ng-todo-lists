import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTodoListsComponent } from './list-of-todo-lists.component';

describe('ListOfTodoListsComponent', () => {
  let component: ListOfTodoListsComponent;
  let fixture: ComponentFixture<ListOfTodoListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfTodoListsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTodoListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
