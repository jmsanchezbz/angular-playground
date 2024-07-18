import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemDTO } from "src/app/Models/item.dto";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() item: ItemDTO = new ItemDTO();

  constructor(private route: Router) {
    console.log("CardComponent-constructor", this.item);
  }

  ngOnInit(): void {
    console.log("CardComponent-onInit", this.item);
  }

  detail(photoId: string): void {
    console.log("CardComponent-detail", photoId);

    this.route.navigate([`/items/${photoId}`]);
  }
}
