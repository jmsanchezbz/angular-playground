import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from "@angular/router";
import { Observable } from "rxjs";
import { ItemService } from "./items.service";
import { ItemDTO } from "../Models/item.dto";

export const itemLoadResolveFn: ResolveFn<ItemDTO> = (
  route: ActivatedRouteSnapshot
): ItemDTO | Observable<ItemDTO> | Promise<ItemDTO> => {
  const service = inject(ItemService);

  const param = route.paramMap.get("id");
  const paramId = param ? param : "";

  console.log("ItemLoadResolver: ", paramId);

  return service.getPhotoById(paramId);
};
