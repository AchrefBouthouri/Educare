import { Component, OnInit, ViewChild } from '@angular/core';
import { ReclamationService } from './reclamation.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  detail : boolean = false;
  Id: any;
  reclamation: any;
  onSelectedId(id: number) {
    this.Id = id;
    console.log("details",this.Id)
    this.reclamationService.getReclamationById(this.Id).subscribe(async res => {
      this.reclamation = await res;
      this.detail = true;
      console.log('res',res);
  });
  }
  
  constructor(private reclamationService: ReclamationService) { }

  ngOnInit() {
  }
}
