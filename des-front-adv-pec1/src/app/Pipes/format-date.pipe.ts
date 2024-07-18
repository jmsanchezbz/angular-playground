import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatDate",
})
export class FormatDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Date, ...args: number[]): unknown {
    let formattedDate: string | null = null;

    switch (args[0]) {
      case 1:
        formattedDate = this.datePipe.transform(value, "ddMMyyyy");
        break;
      case 2:
        formattedDate = this.datePipe.transform(value, "dd / MM / yyyy");
        break;
      case 3:
        formattedDate = this.datePipe.transform(value, "dd/MM/yyyy");
        break;
      case 4:
        formattedDate = this.datePipe.transform(value, "yyyy-MM-dd");
        break;
      default:
    }

    return formattedDate;
  }
}
