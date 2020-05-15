import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPagingComponent } from './ng-paging.component';

describe('NgPagingComponent', () => {
  let component: NgPagingComponent;
  let fixture: ComponentFixture<NgPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
