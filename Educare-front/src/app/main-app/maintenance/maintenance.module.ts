import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { AddComponent } from './reclamation/pages/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingComponent } from './reclamation/pages/listing/listing.component';
import { DetailsComponent } from './reclamation/pages/details/details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';




@NgModule({
  declarations: [
    ReclamationComponent,
    AddComponent,
    ListingComponent,
    DetailsComponent,
    RendezVousComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class MaintenanceModule { }
