import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralResultsComponent } from './general-results.component';

describe('GeneralResultsComponent', () => {
  let component: GeneralResultsComponent;
  let fixture: ComponentFixture<GeneralResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
