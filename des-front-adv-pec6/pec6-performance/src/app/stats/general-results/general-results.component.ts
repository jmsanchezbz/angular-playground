import { Component } from "@angular/core";
import { Chart, ChartTypeRegistry, registerables } from "chart.js/auto";
import { ChartData } from "src/app/Models/chart.dto";
import { StudentDTO } from "src/app/Models/student.dto";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-general-results",
  standalone: true,
  imports: [],
  templateUrl: "./general-results.component.html",
  styleUrl: "./general-results.component.scss",
})
export class GeneralResultsComponent {
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService) {
    console.log("GeneralResultsComponent");

    const start = Date.now();
    while (Date.now() - start < 3000) {}
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.dataSvc.getData().subscribe((data) => {
      this.students = data;
      const myData = this.buildData(this.students);
      this.showChart(myData);
    });
  }

  private buildData(students: StudentDTO[]): ChartData {
    const totals = [
      students.filter((s) => s.mark && s.mark >= 5).length,
      students.filter((s) => s.mark && s.mark < 5).length,
    ];

    const data: ChartData = {
      labels: ["Passers", "Failers"],
      datasets: [
        {
          label: "Alumnos",
          data: totals,
        },
      ],
    };

    return data;
  }

  private showChart(data: ChartData) {
    const myChart = new Chart("generalChart", {
      type: "doughnut",
      data: data,
    });
  }
}
