import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SharedService } from "../Services/shared.service";
import { ItemDTO, ItemRawDTO } from "../Models/item.dto";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import Utils from "./Utils";
import { LoadingService } from "./loading.service";

const pre_acces_token =
  "cWJLWV9sa0cyVzBNWDkxQ0QzR29jUUVxUExnMURrdGhVYkxDVGhfeXdFdw==";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  readonly url: string = "https://api.unsplash.com";
  private acces_token: string;
  private controller: string;
  private clientId: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private loadingSvc: LoadingService
  ) {
    this.controller = "categories";
    this.acces_token = Utils.decode(pre_acces_token);
    this.clientId = `client_id=${this.acces_token}`;
  }

  getPhotos(pageId: number = 1): Observable<ItemDTO[]> {
    this.loadingSvc.setLoading(true);
    
    return this.http
      .get<ItemRawDTO[]>(`${this.url}/photos?${this.clientId}`)
      .pipe(
        tap(console.log),
        map((itemRawDTOs: ItemRawDTO[]) => ItemDTO.fromItems(itemRawDTOs)),
        catchError(this.sharedService.handleError),
        finalize(() => this.loadingSvc.setLoading(false))
      );
  }

  getPhotoById(photoId: string): Observable<ItemDTO> {
    this.loadingSvc.setLoading(true);

    return this.http
      .get<ItemRawDTO>(`${this.url}/photos/${photoId}?${this.clientId}`)
      .pipe(
        map((itemRawDTO) => ItemDTO.from(itemRawDTO)),
        catchError(this.sharedService.handleError),
        finalize(() => this.loadingSvc.setLoading(false))
      );
  }
  
}
