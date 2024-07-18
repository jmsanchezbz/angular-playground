import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import { LocalStorageService } from "./local-storage.service";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private access_token: string | null = null;

  constructor(
    private store: Store<AppState> //private localStorageService: LocalStorageService
  ) {
    //this.access_token = this.localStorageService.get("access_token");
    this.store.select("auth").subscribe((auth) => {
      this.access_token = auth.credentials.access_token;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //this.access_token = this.localStorageService.get("access_token");
    if (this.access_token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      });
    }

    return next.handle(req);
  }
}
