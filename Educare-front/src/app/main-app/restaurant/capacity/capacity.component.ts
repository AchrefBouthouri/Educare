import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../order/order.service";
import {CapacityService} from "./capacity.service";
import {ICapacity} from "./ICapacity";
import {NgForm} from "@angular/forms";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  capacity: any;
  id:any;
  showForm = false;
  newValue: any;
  newCapacity: any;
  selectedTabIndex: number = 0; // add this property and initialize it to 0





  constructor(private capacityservice: CapacityService) {}



  ngOnInit(): void {
    this.capacityservice.getAllCapacity().subscribe(
      (response) => {
        console.log('ALL capacity', response);
        this.capacity = response;
      },
      () => {
        console.error('Refused');
      }
    );

  }
  showUpdateForm(capacity: ICapacity) {
    this.id = capacity.id;
    this.showForm = true;
  }
  updateCapacity() {
    this.capacityservice.updateCapacityValue(this.id, this.newValue).subscribe(
      (response) => {
        console.log('Capacity updated', response);
        this.showForm = false;
        // Reload the capacity list
        this.capacityservice.getAllCapacity().subscribe(
          (response) => {
            console.log('ALL capacity', response);
            this.capacity = response;
          },
          () => {
            console.error('Refused');
          }
        );
      },
      () => {
        console.error('Capacity update failed');
      }
    );
  }

  deleteCapacity(id: number) {
    this.capacityservice.deleteCapacity(id).subscribe(
      () => {
        console.log('Order Deleted', id);
        // Remove the deleted order from the list of orders
        this.capacity = this.capacity.filter((order: any) => order.id !== id);
      },
      () => {
        console.error('Refused');
      }
    );
  }


  onSubmit(form: NgForm) {
    const capacity: { value: any } = { value: this.newCapacity };
    this.capacityservice.createCapacity(capacity).subscribe(
      (response) => {
        console.log('Capacity added', response);
        // Reload the capacity list
        this.capacityservice.getAllCapacity().subscribe(
          (response) => {
            console.log('ALL capacity', response);
            this.capacity = response;
          },
          () => {
            console.error('Refused');
          }
        );
        // Clear the form
        form.resetForm();
        this.newCapacity = null;

      },
      () => {
        console.error('Capacity add failed');
      }
    );
  }

}
