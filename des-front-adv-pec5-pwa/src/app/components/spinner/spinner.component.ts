import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.css",
})
export class SpinnerComponent {
  @Input() loading: boolean = false;
}
