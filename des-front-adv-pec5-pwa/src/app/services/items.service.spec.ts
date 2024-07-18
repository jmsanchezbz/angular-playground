import { TestBed } from "@angular/core/testing";

import { ItemService } from "./items.service";

describe("ItemsService", () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
