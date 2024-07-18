import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemListComponent } from "./components/item/item-list/item-list.component";
import { ItemDetailComponent } from "./components/item/item-detail/item-detail.component";
import { itemLoadResolveFn } from "./services/item-load-resolver";

const routes: Routes = [
  {
    path: "",
    component: ItemListComponent,
  },
  {
    path: "items",
    component: ItemListComponent,
  },
  {
    path: "items/:id",
    component: ItemDetailComponent,
    resolve: { item: itemLoadResolveFn },
  },
  {
    path: "**",
    component: ItemListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
