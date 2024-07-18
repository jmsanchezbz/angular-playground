import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from "@angular/common/http";
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemRawDTO, ItemDTO } from "src/app/Models/item.dto";
import { ItemService } from "src/app/services/items.service";
import { ResponseError, SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  animations: [
    trigger("fadeInOut", [
      // Initial state when element enters the view
      state("void", style({ opacity: 0.2 })),
      // Transition when element enters or leaves the view
      transition("void => *", [
        // Animate the change in opacity over 1500ms
        animate(1500),
      ]),
    ]),
  ],
})
export class ItemListComponent implements OnInit, AfterViewInit {
  items!: ItemDTO[];
  selectionControl = new FormControl("list");
  previousSelectionValue: string | undefined | null;

  displayedColumns: string[] = ["id", "description", "actions"];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let errorResponse: ResponseError;

    this.itemService.getPhotos().subscribe(
      (items: ItemDTO[]) => {
        console.log("ItemList-onInit", items);

        this.items = items;
      },
      (error: HttpErrorResponse) => {
        console.log("ItemList-onInit", error);

        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  ngAfterViewInit(): void {
    this.selectionControl.valueChanges.subscribe((value) => {
      console.log("Selection changed to:", value);
      if (value !== this.previousSelectionValue) {
        this.previousSelectionValue = value;
        console.log("Selection changed to:", value);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  open(param: string) {
    console.log("open", param);
    const nextRoute: string = `/items/${param}`;

    this.router.navigate([nextRoute]);
  }
}
