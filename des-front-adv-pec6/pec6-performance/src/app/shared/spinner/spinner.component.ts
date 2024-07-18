import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  standalone: true,
  selector: "app-spinner",
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent {
  @Input() loading: boolean = false;
}
