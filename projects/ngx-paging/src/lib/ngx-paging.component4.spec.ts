import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPagingComponent } from './ngx-paging.component';

describe('NgxPagingComponent  totalElementsCount = 0, pageSize = 0', () => {
  let component: NgxPagingComponent;
  let fixture: ComponentFixture<NgxPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPagingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPagingComponent);
    component = fixture.componentInstance;
    component.totalElementsCount = 0;
    component.pageSize = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct page number', () => {
    expect(component.totalPagesCount).toBe(0);
  });

  it('should not be able to navigate at all', () => {
    expect(component.canGoToFirstPage).toBeFalse();
    expect(component.canGoToPreviousPage).toBeFalse();
    expect(component.canGoToLastPage).toBeFalse();
    expect(component.canGoToNextPage).toBeFalse();
  });

  it('should next page be undefined', () => {
    component.currentPage = 1;
    expect(component.nextPage).toBe(undefined);
  });

  it('should previous page be undefined', () => {
    component.currentPage = 1;
    expect(component.previousPage).toBe(undefined);
  });

  it('should last page 0', () => {
    expect(component.lastPage).toBe(0);
  });

  it('should current page be 0', () => {
    expect(component.currentPage).toBe(0);
  });

  it('should current page not changed with negative value', () => {
    component.currentPage = -1;
    expect(component.currentPage).toBe(0);
  });

  it('should current page not changed with execceding value', () => {
    component.currentPage = 2;
    expect(component.currentPage).toBe(0);
  });

  it('should emit event when current page changed', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 2;
    expect(component.pageChanged.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit event when current page changed', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = undefined;
    expect(component.pageChanged.emit).toHaveBeenCalledTimes(0);
  });

  it('should needpaging property be false', () => {
    expect(component.needPaging).toBe(false);
  });

  it('should shouldPagingComponentBeHidden property be true', () => {
    expect(component.shouldPagingComponentBeHidden).toBe(true);
  });
});
