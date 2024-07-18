import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsPageComponent } from './stats-page.component';
import { ResumeDataComponent } from './resume-data/resume-data.component';
import { GenderComponent } from './gender/gender.component';
import { GeneralResultsComponent } from './general-results/general-results.component';


@NgModule({
  declarations: [StatsPageComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    ResumeDataComponent,
    GenderComponent,
    GeneralResultsComponent
  ]
})
export class StatsModule { }
