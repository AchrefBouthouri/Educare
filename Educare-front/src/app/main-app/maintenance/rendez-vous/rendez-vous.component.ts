import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationComponent } from '../reclamation/reclamation.component';
import { ReclamationService } from '../reclamation/reclamation.service';
import { RendezVousService } from './rendez-vous.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  RdvList: any;
  searchDate: Date | undefined;
  filteredRdvList: any;

  constructor(private rdvService: RendezVousService, private route: Router) {
    
  }
  ngOnInit(): void {
    this.rdvService.getAllRDV().subscribe(res => {
      this.RdvList = res;
      console.log('res',this.RdvList);
      this.search();
    });
  }

  search() {
    if (this.searchDate) {
      this.filteredRdvList = this.RdvList.filter((rdv: {createdAt: string | number | Date; }) => {
        let dateMatch = true;
        if (this.searchDate) {
          const searchDate = new Date(this.searchDate);
          dateMatch = new Date(rdv.createdAt).toDateString() === searchDate.toDateString();
        }
        return dateMatch;
      });
    } else {
      this.filteredRdvList = this.RdvList;
    }
  }

}
