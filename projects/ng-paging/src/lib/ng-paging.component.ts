import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-paging',
  template: `
    <p>
      ng-paging works!
    </p>
  `,
})
export class NgPagingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public pageSize: number;
  public currentPage: number = 1;
  public totalCount: number;

  public get pageCount(): number {
    if (this.pageSize !== 0)
      return Math.ceil(this.totalCount / this.pageSize);
    else
      return 0;
  }

  public setCurrentPage(page: number): void {
    if (page < this.firstPage)
      page = this.firstPage;

    if (page > this.lastPage)
      page = this.lastPage;

    this.currentPage = page;
  }

  public firstPage = 1;
  public get lastPage(): number {
    return this.pageCount;
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
    return this.pageCount > 1;
  }

  public get nextPageActive(): boolean {
    return !!this.nextPage;
  }

  public get previousPageActive(): boolean {
    return !!this.previousPage;
  }

  public get lastPageActive(): boolean {
    return (this.lastPage !== this.currentPage);
  }

  public get firstPageActive() {
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

  public generateMaxPage = function () {
    const current = this.CurrentPage();
    const pageCount = this.PageCount();
    const first = this.FirstPage;

    const sectionLength = parseInt((maxPageCount - 1) / 2);
    let upperLimit = current + sectionLength;
    let downLimit = current - sectionLength;

    while (upperLimit > pageCount) {
      upperLimit--;
      if (downLimit > first)
        downLimit--;
    }

    while (downLimit < first) {
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

  public getPages(): Array<number> {
    if (this.pageCount <= maxPageCount)
      return this.generateAllPages();
    else
      return this.generateMaxPage();
  }

  public update(e) {
    this.totalCount = e.TotalCount;
    this.pageSize = e.pageSize;
    this.setCurrentPage(e.currentPage);
  }

  public goToPage(page: number): void {
    if (page >= this.firstPage && page <= this.lastPage)
      this.setCurrentPage(page);
  }

  public goToFirst(): void {
    this.setCurrentPage(this.firstPage);
  }

  goToPrevious(): void {
    const previous = this.previousPage;
    if (previous)
      this.setCurrentPage(previous);
  }

  goToNext(): void {
    const next = this.nextPage;
    if (next)
      this.setCurrentPage(next);
  }

  goToLast(): void {
    this.setCurrentPage(this.lastPage);
  }
}
