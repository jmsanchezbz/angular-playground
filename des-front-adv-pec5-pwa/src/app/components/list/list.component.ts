import { Component, OnInit } from "@angular/core";
import { ImageService } from "../../services/image.service";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent implements OnInit {
  images: any;

  constructor(private imageSvc: ImageService, sharedService: SharedService) {}

  ngOnInit() {
    this.imageSvc.getImages().subscribe(
      data => console.log(data)
    );
  }
}
