import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemDTO, UrlsDTO, UserDTO } from "src/app/Models/item.dto";
import { CardComponent } from "src/app/shared/card/card.component";

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.scss"],
})
export class ItemDetailComponent implements OnInit {
  item: ItemDTO = new ItemDTO("", "", "", "", "", "");
  detailsVisible: boolean = false;

  constructor(private aRoute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    this.aRoute.data.subscribe((response: any) => {
      console.log("ItemDetailComponent:", response.item);

      if (response.item && typeof response.item === "object") {
        this.item = response.item;
      } else {
        console.log("Missing or invalid item data in route data");
      }
    });
  }

  showDetails(): void {
    console.log("ItemDetail-detail");
    this.detailsVisible = true;
  }

  hideDetails(): void {
    console.log("ItemDetail-detail");
    this.detailsVisible = false;
  }

  goHome() {
    this.route.navigate(["/"]);
  }
}
