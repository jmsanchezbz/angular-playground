import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class MenuComponent {
  constructor(private router: Router) {}

  home(): void {
    console.log("Menu home");
    this.router.navigateByUrl("/");
  }

  list(): void {
    console.log("Menu list");
    this.router.navigateByUrl("/list");
  }

  stats(): void {
    console.log("Menu stats");
    this.router.navigateByUrl("/stats");
  }
}
