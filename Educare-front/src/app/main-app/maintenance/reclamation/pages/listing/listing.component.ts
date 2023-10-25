import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { ReclamationService } from '../../reclamation.service';
import { Router } from '@angular/router';
import { ReclamationComponent } from '../../reclamation.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Output() selectedId = new EventEmitter<number>();
  ReclamationList: any;
  filteredDescriptions: string[] = [];
  searchDescription: string = '';
  searchDate: Date | undefined;
  filteredReclamationList: any;

  constructor(private reclamationService: ReclamationService, private route: Router, private parent: ReclamationComponent) {
    this.reclamationService.onAddReclamationEvent.subscribe(resp => {
      this.reclamationService.getAllReclamation().subscribe(async response => {
        this.ReclamationList = this.sortReclamationsByAvailablity(response);
        this.search();
      })
    });
    this.reclamationService.onClotureReclamationEvent.subscribe(resp => {
      this.reclamationService.getAllReclamation().subscribe(async response => {
        this.ReclamationList = this.sortReclamationsByAvailablity(response);
        this.search();
      })
    });
    this.reclamationService.onDeleteReclamationEvent.subscribe(resp => {
      this.reclamationService.getAllReclamation().subscribe(async response => {
        this.ReclamationList = this.sortReclamationsByAvailablity(response);
        this.search();
      })
    });
    this.reclamationService.onUpdateReclamationEvent.subscribe(resp => {
      this.reclamationService.getAllReclamation().subscribe(async response => {
        this.ReclamationList = this.sortReclamationsByAvailablity(response);
        this.search();
      })
    });
    
  }
  ngOnInit(): void {
    this.reclamationService.getAllReclamation().subscribe(res => {
      this.ReclamationList = res.sort((a: { availablity: any; }, b: { availablity: any; }) => (a.availablity === b.availablity) ? 0 : a.availablity ? -1 : 1);
      //console.log('res',this.ReclamationList);
      this.search();


    });
  }

  sortReclamationsByAvailablity(reclamations: any) {
    return reclamations.sort((a: { availablity: boolean; }, b: { availablity: any; }) => {
      if (a.availablity === b.availablity) {
        return 0;
      } else if (a.availablity === true) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  detail(id: any) {
    this.parent.tabGroup.selectedIndex = 2;
    //this.route.navigate(['/reclamation'], { queryParams: { tabIndex: 2 } });
    //console.log("id",id);
    this.selectedId.emit(id);
  }

  closeReclamation(id: any) {
    this.reclamationService.ClotureReclamation(id).subscribe(response => {
      //console.log('response',response)
    })
  }

  deleteReclamation(id: any) {
    this.reclamationService.DeleteReclamation(id).subscribe(response => {
      //console.log('response',response)
    })

  }

  search() {
    if (this.searchDescription || this.searchDate) {
      this.filteredReclamationList = this.ReclamationList.filter((reclamation: { description: string; createdAt: string | number | Date; }) => {
        let descriptionMatch = true;
        let dateMatch = true;
        if (this.searchDescription) {
          descriptionMatch = reclamation.description.toLowerCase().includes(this.searchDescription.toLowerCase());
        }
        if (this.searchDate) {
          const searchDate = new Date(this.searchDate);
          dateMatch = new Date(reclamation.createdAt).toDateString() === searchDate.toDateString();
        }
        return descriptionMatch && dateMatch;
      });
    } else {
      this.filteredReclamationList = this.ReclamationList;
    }
  }

}
