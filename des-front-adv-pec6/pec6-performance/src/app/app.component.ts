import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { LoadingService } from "./services/loading.service";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = "Performance app";

  isLoading: boolean = false;

  constructor(
    private loadingSvc: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log('AppComponent');
  }

  ngOnInit(): void {
    this.loadingSvc.isAppLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
