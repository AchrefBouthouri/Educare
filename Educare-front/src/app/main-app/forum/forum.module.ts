
import { ForumComponent } from './forum/forum.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MatCardModule } from '@angular/material/card';
import { TimesincePipe } from './forum/timesince.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';



  // other module properties...

@NgModule({
  declarations: [
    ForumComponent,  TimesincePipe, ProfileComponent,
  ],
  imports: [
    ReactiveFormsModule ,CommonModule,FormsModule,
  ]
})
export class ForumModule { }
