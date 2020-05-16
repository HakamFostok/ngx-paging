import { NgModule } from '@angular/core';
import { NgPagingComponent } from './ng-paging.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgPagingComponent],
  imports: [CommonModule],
  exports: [NgPagingComponent]
})
export class NgPagingModule { }
