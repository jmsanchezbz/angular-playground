import { NgModule, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPageComponent } from './list-page.component';
import { StudentDTO } from '../Models/student.dto';
import { DataService } from '../services/data.service';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    ScrollingModule,
    AsyncPipe,
    NgFor
  ]
})
export class ListModule { 
}
