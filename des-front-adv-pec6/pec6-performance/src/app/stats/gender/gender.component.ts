import { Component, OnInit } from '@angular/core';
import { StudentDTO } from 'src/app/Models/student.dto';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartTypeRegistry, registerables } from "chart.js/auto";
import { ChartData } from "src/app/Models/chart.dto";

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private dataSvc: DataService) {
    console.log("GenderDataComponent");

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
      students.filter((s) => s.gender && s.gender == 'M').length,
      students.filter((s) => s.gender && s.gender == 'F').length,
    ];

    const data: ChartData = {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Alumnos",
          data: totals,
          backgroundColor: ['blue','pink']
        },
      ],
    };

    return data;
  }

  private showChart(data: ChartData) {
    const myChart = new Chart("genderChart", {
      type: "pie",
      data: data,
    });
  }
}
