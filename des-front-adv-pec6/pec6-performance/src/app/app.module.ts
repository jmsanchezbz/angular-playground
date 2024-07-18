import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, isDevMode } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormatDatePipe } from "./Pipes/format-date.pipe";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MatExpansionModule } from "@angular/material/expansion";
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MenuComponent,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonToggleModule,
    MatExpansionModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    SpinnerComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
