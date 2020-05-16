import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'ng-paging',
  templateUrl: 'ng-paging.component.html'
})
export class NgPagingComponent implements OnDestroy {

  @Input() public firstPageText: string;
  @Input() public firstPageClasses: any;

  @Input() public lastPageText: string;
  @Input() public lastPageClasses: any;

  @Input() public nextPageText: string;
  @Input() public nextPageClasses: any;

  @Input() public previousPageText: string;
  @Input() public previousPageClasses: any;

  @Input() public showComponentAlways: boolean = false;
  @Input() public componentClasses: any = {
    'flip': true,
    'pull-right': true,
    'pagination': true,
    'pagination-sm': true
  };

  @Output() public pageChanged: EventEmitter<number> = new EventEmitter();

  private get firstPage() {
    return (this.totalPagesCount === 0) ? 0 : 1;
  }

  private _pageSize: number;
  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(pageSize: number) {
    if (pageSize < 0)
      return;

    this._pageSize = Math.round(pageSize);
  }

  private _currentPage: number = 1;
  public get currentPage(): number {
    if (this.totalPagesCount === 0)
      this._currentPage = 0;
    return this._currentPage;
  }
  public set currentPage(page: number) {
    if (!page)
      return;

    if (page < 0)
      return;

    
    if (page < this.firstPage)
      page = this.firstPage;

    if (page > this.lastPage)
      page = this.lastPage;

    if (this._currentPage !== page) {
      this._currentPage = page;
      this.pageChanged.emit(this._currentPage);
    }
  }

  private _totalElementsCount: number;
  public get totalElementsCount(): number {
    return this._totalElementsCount;
  }
  @Input() public set totalElementsCount(totalElementsCount: number) {
    if (totalElementsCount < 0)
      return;

    this._totalElementsCount = Math.round(totalElementsCount);
  }

  public get totalPagesCount(): number {
    if (this.pageSize !== 0)
      return Math.ceil(this.totalElementsCount / this.pageSize);
    else
      return 0;
  }

  public get lastPage(): number {
    return (this.totalPagesCount === 0) ? 0 : this.totalPagesCount;
  }

  public get nextPage(): number {
    const next = this.currentPage + 1;
    if (next > this.lastPage)
      return undefined;
    return next;
  }

  public get previousPage(): number {
    const previous = this.currentPage - 1;
    if (previous < this.firstPage)
      return undefined;
    return previous;
  }

  public get needPaging(): boolean {
    return this.totalPagesCount > 1;
  }

  public get canGoToNextPage(): boolean {
    return !!this.nextPage;
  }

  public get canGoToPreviousPage(): boolean {
    return !!this.previousPage;
  }

  public get canGoToLastPage(): boolean {
    if (this.lastPage === 0)
      return false;
    return (this.lastPage !== this.currentPage);
  }

  public get canGoToFirstPage(): boolean {
    return (this.firstPage !== this.currentPage);
  }

  // this should be odd number always
  @Input() public maxPageCount: number = 7;

  private generateAllPages() {
    const pages: Array<number> = [];
    for (let i = this.firstPage; i <= this.lastPage; i++)
      pages.push(i);

    return pages;
  }

  public generateMaxPage() {
    const current = this.currentPage;
    const pageCount = this.totalPagesCount;

    const sectionLength = Math.round((this.maxPageCount - 1) / 2);
    let upperLimit = current + sectionLength;
    let downLimit = current - sectionLength;

    while (upperLimit > pageCount) {
      upperLimit--;
      if (downLimit > this.firstPage)
        downLimit--;
    }

    while (downLimit < this.firstPage) {
      downLimit++;
      if (upperLimit < pageCount)
        upperLimit++;
    }

    const pages: Array<number> = [];
    for (let i = downLimit; i <= upperLimit; i++) {
      pages.push(i);
    }
    return pages;
  }

  public generatePages(): Array<number> {
    if (this.totalPagesCount <= this.maxPageCount)
      return this.generateAllPages();
    else
      return this.generateMaxPage();
  }

  public goToFirstPage(): void {
    this.currentPage = this.firstPage;
  }

  public goToPreviousPage(): void {
    const previous = this.previousPage;
    if (previous)
      this.currentPage = previous;
  }

  public goToNextPage(): void {
    const next = this.nextPage;
    if (next)
      this.currentPage = next;
  }

  public goToLastPage(): void {
    this.currentPage = this.lastPage;
  }

  public get shouldPagingComponentBeHidden() {
    return this.needPaging === false && this.showComponentAlways === false
  }

  ngOnDestroy(): void {
    this.pageChanged.unsubscribe();
  }
}
