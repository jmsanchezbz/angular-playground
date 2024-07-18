import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { StudentDTO } from "../Models/student.dto";
import { Papa } from "ngx-papaparse";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private csvPath = "assets/data/notas_alumnos.csv";

  constructor(private papa: Papa, private http: HttpClient) {}

  getData(): Observable<StudentDTO[]> {
    return this.http.get(this.csvPath, { responseType: "text" }).pipe(
      map((data) => {
        const parsedData = this.papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("DataService:", result);
          },
        });

        const students: StudentDTO[] = parsedData.data.map((item: any) => ({
          id: item.ID_Alumno,
          name: item.Nombre,
          surname: item.Apellidos,
          gender: item.Sexo,
          mark: item.Nota_Final,
          absences: item.Faltas_Asistencia,
        }));

        return students;
      }),
      catchError((error) => {
        console.error(`Loading csv file`, error);
        return of([]);
      })
    );
  }
}
