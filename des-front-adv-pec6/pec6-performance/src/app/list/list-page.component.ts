import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { StudentDTO } from "../Models/student.dto";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrl: "./list-page.component.scss",
})
export class ListPageComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService) {
    console.log("ListComponent");
  }

  ngOnInit(): void {
    this.dataSvc.getData().subscribe((data) => {
      this.students = data;
      console.log('ListComponent-OnInit students:',this.students);
    });
  }

  trackById(index: number, item: StudentDTO): number {
    return item.id ? item.id : 0;
  }
}
