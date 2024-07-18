import { Component, OnInit } from "@angular/core";
import { Chart, ChartTypeRegistry, registerables } from "chart.js/auto";
import { StudentDTO } from "src/app/Models/student.dto";
import { DataService } from "src/app/services/data.service";
import { ChartData } from "src/app/Models/chart.dto";

//Chart.register(...registerables)

@Component({
  selector: "app-resume-data",
  standalone: true,
  imports: [],
  templateUrl: "./resume-data.component.html",
  styleUrl: "./resume-data.component.scss",
})
export class ResumeDataComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService) {
    console.log("ResumeDataComponent");

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
      students.length,
      students.filter((s) => s.mark && s.mark >= 5).length,
      students.filter((s) => s.mark && s.mark < 5).length,
    ];

    const data: ChartData = {
      labels: ["Total Alumnos", "Total Aprobados", "Total Suspendidos"],
      datasets: [
        {
          label: "Alumnos",
          data: totals,
          backgroundColor:['blue','green','red']
        },
      ],
    };

    return data;
  }

  private showChart(data: ChartData) {
    const myChart = new Chart("resumeChart", {
      type: "bar",
      data: data,
      options: {
        responsive:true
      }
    });
  }
}
