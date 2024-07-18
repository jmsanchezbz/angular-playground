import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormatDatePipe } from "../Shared/Pipes/format-date.pipe";
import { HomeComponent } from "./components/home/home.component";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { CardComponent } from "../Shared/Components/card/card.component";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    FormatDatePipe,
    DashboardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    CanvasJSAngularChartsModule
  ],
})
export class PostModule {}
