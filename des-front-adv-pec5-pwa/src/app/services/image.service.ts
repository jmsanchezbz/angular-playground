import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable } from "rxjs";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  private loading = new BehaviorSubject<any>(false);

  readonly apikey = "iOW19H0pIbuBf1HMEJxczHJ6LcnE35EKKcNJdo8nkmXJa4GlbLqaNOYi";

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getLoading() {
    return this.loading.asObservable();
  }

  setSharedDate(data: any) {
    this.loading.next(data);
  }

  //curl -H "Authorization: iOW19H0pIbuBf1HMEJxczHJ6LcnE35EKKcNJdo8nkmXJa4GlbLqaNOYi" \  "https://api.pexels.com/v1/search?query=people"

  getImages(): Observable<any> {
    return this.http
      .get<any>("https://api.pexels.com/v1/search?query=people")
      .pipe(catchError(this.sharedService.handleError));
  }
}
