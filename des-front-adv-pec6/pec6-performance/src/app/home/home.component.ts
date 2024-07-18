import { Component, OnInit } from "@angular/core";
import { StudentDTO } from '../Models/student.dto';
import { DataService } from '../services/data.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService) {
    console.log("HomeComponent");
  }

  ngOnInit(): void {
    this.dataSvc.getData().subscribe((data) => {
      this.students = data;
      console.log(this.students);
    });
  }
}
