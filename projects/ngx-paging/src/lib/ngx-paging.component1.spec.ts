import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPagingComponent } from './ngx-paging.component';

describe('NgxPagingComponent  totalElementsCount = 100, pageSize = 5', () => {
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
    component.totalElementsCount = 100;
    component.pageSize = 5;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct page number', () => {
    expect(component.totalPagesCount).toBe(20);
  });

  it('should be navigate forwards only', () => {
    expect(component.canGoToFirstPage).toBeFalse();
    expect(component.canGoToPreviousPage).toBeFalse();

    expect(component.canGoToLastPage).toBeTrue();
    expect(component.canGoToNextPage).toBeTrue();
  });

  it('should be navigate backwards and forwards', () => {
    component.currentPage = 10;

    expect(component.canGoToFirstPage).toBeTrue();
    expect(component.canGoToPreviousPage).toBeTrue();

    expect(component.canGoToLastPage).toBeTrue();
    expect(component.canGoToNextPage).toBeTrue();
  });

  it('should be navigate backwards only', () => {
    component.currentPage = 20;

    expect(component.canGoToFirstPage).toBeTrue();
    expect(component.canGoToPreviousPage).toBeTrue();

    expect(component.canGoToLastPage).toBeFalse();
    expect(component.canGoToNextPage).toBeFalse();
  });

  it('should next page be 2', () => {
    component.currentPage = 1;
    expect(component.nextPage).toBe(2);
  });

  it('should next page be 3', () => {
    component.currentPage = 2;
    expect(component.nextPage).toBe(3);
  });

  it('should next page be undefined', () => {
    component.currentPage = 20;
    expect(component.nextPage).toBe(undefined);
  });

  it('should previous page be 2', () => {
    component.currentPage = 3;
    expect(component.previousPage).toBe(2);
  });

  it('should previous page be 1', () => {
    component.currentPage = 2;
    expect(component.previousPage).toBe(1);
  });
  
  it('should previous page be undefined', () => {
    component.currentPage = 1;
    expect(component.previousPage).toBe(undefined);
  });

  it('should last page 20', () => {
    expect(component.lastPage).toBe(20);
  });

  it('should current page be 10', () => {
    component.currentPage = 10;
    expect(component.currentPage).toBe(10);
  });

  it('should current page not changed with negative value', () => {
    component.currentPage = -1;
    expect(component.currentPage).toBe(1);
  });

  it('should current page not changed with execceding value', () => {
    component.currentPage = 21;
    expect(component.currentPage).toBe(20);
  });

  it('should emit event when current page changed', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 2;
    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('should emit event when current page changed', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = undefined;
    expect(component.pageChanged.emit).toHaveBeenCalledTimes(0);
  });

  it('should needpaging property be true', () => {
    expect(component.needPaging).toBe(true);
  });

  it('should shouldPagingComponentBeHidden property be false', () => {
    expect(component.shouldPagingComponentBeHidden).toBe(false);
  });
});
