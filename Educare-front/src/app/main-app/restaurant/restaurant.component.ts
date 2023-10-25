import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestaurantService} from "./restaurant.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CapacityService} from "./capacity/capacity.service";



export class RestaurantModule { }

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})

export class RestaurantComponent implements OnInit {


  orders: any;
  menuName: any;
  email: any;
  token: any;
  currency: any;
  nextMealTime: any;
  elementRef:any;
  capacity: any;





  constructor(private http: HttpClient,private restaurantService: RestaurantService,private capacityservice: CapacityService) { }

  ngOnInit() {
    this.orders = [];
    this.getNextMealTime();
    setInterval(() => {
      this.getNextMealTime();
    }, 1000);

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

  getNextMealTime() {
    this.http.get('http://localhost:8082/mealreminder/next-meal', { responseType: 'text' }).subscribe(
      response => {
        this.nextMealTime = response;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }










  createOrder() { setTimeout(() => {
    console.log(this.showQRCode());
  }, 7000);
    this.restaurantService.createOrderFromMenu(this.menuName, this.email, this.token, this.currency).subscribe(

      (response) => {
        console.log('Order Created', response);
        // Update the list of orders
        this.orders.push(response);

        // Clear the form
        this.menuName = '';
        this.email = '';
        this.token = '';
        this.currency = '';
      },
      () => {
        console.error('Refused');
      }
    );
  }
  showQRCode(): void {
    const id = 28; // Change the ID to the static ID you want to use
    this.restaurantService.getQRCodeImage(id).subscribe(
      response => {
        const url = URL.createObjectURL(response);
        window.open(url, '_blank');
      },
      error => {
        console.error('Error getting QR code image:', error);
      }
    );
  }


  deleteOrder(id: any) {
    this.restaurantService.deleteOrder(id).subscribe(
      () => {
        console.log('Order Deleted', id);
        // Remove the deleted order from the list of orders
        this.orders = this.orders.filter((order: any) => order.id == id);
        location.reload();

      },
      () => {
        console.error('Refused');
      }
    );
  }



}

