import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-paging',
  templateUrl: 'ngx-paging.component.html'
})
export class NgxPagingComponent implements OnDestroy {

  
  /**
   * Specify the text that will be displayed on the first-page button.
   */
  @Input() public firstPageText: string;

  /**
   * Specify the classes that will be applied on the first-page button.
   */
  @Input() public firstPageClasses: any;

  /**
   * Specify the text that will be displayed on the last-page button.
   */
  @Input() public lastPageText: string;

  /**
   * Specify the classes that will be applied on the last-page button.
   */
  @Input() public lastPageClasses: any;

  /**
   * Specify the text that will be displayed on the next-page button.
   */
  @Input() public nextPageText: string;

  /**
   * Specify the classes that will be applied on the next-page button.
   */
  @Input() public nextPageClasses: any;

  /**
   * Specify the text that will be displayed on the previous-page button.
   */
  @Input() public previousPageText: string;

  /**
   * Specify the classes that will be applied on the previous-page button.
   */
  @Input() public previousPageClasses: any;

  /**
  * if true then the component will always displayed, regardless if it contains one page.
  */
  @Input() public showComponentAlways: boolean = false;

  /**
  * Specify the classes that will be applied on the paging component itself, classes that will be applied on the 'ul' html element.
  */
  @Input() public componentClasses: any = {
    'flip': true,
    'pull-right': true,
    'pagination': true,
    'pagination-sm': true
  };

  /**
   *  event will be triggered when the currentPage property is changed
   */
  @Output() public pageChanged: EventEmitter<number> = new EventEmitter();

  /**
   * Return the number of the first page, will return zero if there is no pages, otherwise will return 1.
   */
  private get firstPage() {
    return (this.totalPagesCount === 0) ? 0 : 1;
  }

  private _pageSize: number;
  /**
   * Get the pageSize property; how may elements should be displayed in each page.
   */
  public get pageSize(): number {
    return this._pageSize;
  }
  /**
   * Set the pageSize property; how may elements should be displayed in each page.
   */
  public set pageSize(pageSize: number) {
    if (pageSize < 0)
      return;

    this._pageSize = Math.round(pageSize);
  }

  private _currentPage: number = 1;
  /**
   * Get the currentPage property; which is the selected page of the component,
   * The returned value must be between 0 and totoalPagesCount
   */
  public get currentPage(): number {
    if (this.totalPagesCount === 0)
      this._currentPage = 0;
    return this._currentPage;
  }
  /**
   * Get the currentPage property; which is the selected page of the component.
   * undefined, negative values, will be disregarded.
   * Values below the firstPage property will fallback to the value of the firstPage property.
   * Values above the lastPage property will fallback to the value of the lastPage property.
   * This property will emit the pageChanged event, if the currentPage value changed.
   */
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
  /*
   * Get the value that represents the total count of the records to be paged.
   */
  public get totalElementsCount(): number {
    return this._totalElementsCount;
  }
  /*
   * Set the value that represents the total count of the records to be paged.
   */
  @Input() public set totalElementsCount(totalElementsCount: number) {
    if (totalElementsCount < 0)
      return;

    this._totalElementsCount = Math.round(totalElementsCount);
  }

  /*
   * Get the value that represents the number of the pages in the component.
   */
  public get totalPagesCount(): number {
    if (this.pageSize !== 0)
      return Math.ceil(this.totalElementsCount / this.pageSize);
    else
      return 0;
  }

  /*
   * Get the order of the last page in the component.
   */
  public get lastPage(): number {
    return (this.totalPagesCount === 0) ? 0 : this.totalPagesCount;
  }

  /*
   * Get the order of the page that come after the currentPage.
   * return undefined if the currentPage property is equal to the lastPage property
   */
  public get nextPage(): number {
    const next = this.currentPage + 1;
    if (next > this.lastPage)
      return undefined;
    return next;
  }

  /*
   * Get the order of the page that come before the currentPage.
   * return undefined if the currentPage property is equal to the firstPage property
   */
  public get previousPage(): number {
    const previous = this.currentPage - 1;
    if (previous < this.firstPage)
      return undefined;
    return previous;
  }

  /*
   * return true, there is more than one page in the component; otherwise, false.
   */
  public get needPaging(): boolean {
    return this.totalPagesCount > 1;
  }

  /*
   * return true, if the nextPage is available, in other word, if the currentPage is not the lastPage.
   */
  public get canGoToNextPage(): boolean {
    return !!this.nextPage;
  }

  /*
   * return true, if the previousPage is available, in other word, if the currentPage is not the firstPage.
   */
  public get canGoToPreviousPage(): boolean {
    return !!this.previousPage;
  }

  /*
   * return true, if the lastPage is available, in other word, if the currentPage is not the lastPage.
   */
  public get canGoToLastPage(): boolean {
    if (this.lastPage === 0)
      return false;
    return (this.lastPage !== this.currentPage);
  }

  /*
   * return true, if the firstPage is available, in other word, if the currentPage is not the firstPage.
   */
  public get canGoToFirstPage(): boolean {
    return (this.firstPage !== this.currentPage);
  }

  private _maxPageCount: number = 7;
  /*
   * Get how many pages that the component will display, not the total pages of the component.
   */
  public get maxPageCount(): number {
    return this._maxPageCount;
  }
  /*
   * Set how many pages that the component will display, not the total pages of the component.
   */
  @Input() public set maxPageCount(maxPageCount: number) {
    // if the parameter is even number, then convert it to odd number
    if (maxPageCount % 2 == 0)
      maxPageCount++;

    if (maxPageCount <= 0)
      return;

    if (maxPageCount > this.totalPagesCount)
      maxPageCount = this.totalPagesCount;

    this._maxPageCount = maxPageCount;
  }

  private generateAllPages(): Array<number> {
    const pages: Array<number> = [];
    for (let i = this.firstPage; i <= this.lastPage; i++)
      pages.push(i);

    return pages;
  }

  private generateMaxPage(): Array<number> {
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

  public get generatePages(): Array<number> {
    if (this.totalPagesCount <= this.maxPageCount)
      return this.generateAllPages();
    else
      return this.generateMaxPage();
  }

  /*
   * Set the currentPage to the firstPage.
   */
  public goToFirstPage(): void {
    this.currentPage = this.firstPage;
  }

  /*
   * Set the currentPage to the previousPage.
   */
  public goToPreviousPage(): void {
    const previous = this.previousPage;
    if (previous)
      this.currentPage = previous;
  }

  /*
   * Set the currentPage to the nextPage.
   */
  public goToNextPage(): void {
    const next = this.nextPage;
    if (next)
      this.currentPage = next;
  }

  /*
   * Set the currentPage to the lastPage.
   */
  public goToLastPage(): void {
    this.currentPage = this.lastPage;
  }

  /*
   * Determine if the component should be hidden or shown according to the values of needPaging property and showComponentAlways property
   */
  public get shouldPagingComponentBeHidden(): boolean {
    return this.needPaging === false && this.showComponentAlways === false
  }

  ngOnDestroy(): void {
    this.pageChanged.unsubscribe();
  }
}
