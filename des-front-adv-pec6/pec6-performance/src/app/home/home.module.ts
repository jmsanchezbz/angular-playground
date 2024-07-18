import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StudentDTO } from '../Models/student.dto';
import { DataService } from '../services/data.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,    
  ]
})
export class HomeModule implements OnInit { 
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService){}

  ngOnInit(): void {
    console.log('Home');
    
    this.dataSvc.getData().subscribe((data) => {
      this.students = data;
      console.log(this.students);
    });
  }
}
