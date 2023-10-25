import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import {} from '../../../app.module';
import {Router} from "@angular/router";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any;
  menuName: any;
  email: any;
  token: any;
  currency: any;
  filteredOrders: any;
  searchTerm: any;
  searchOption:any;

  constructor(private orderservice: OrderService) {}

  ngOnInit(): void {
    this.orderservice.getAllOrders().subscribe(
      (response) => {
        console.log('ALL Orders', response);
        this.orders = response;
        this.filteredOrders = response; // store all orders in a separate array
      },
      () => {
        console.error('Refused');
      }
    );
  }
  filterOrders(): void {
    if (!this.searchTerm) {
      // if the search query is empty, show all orders
      this.filteredOrders = this.orders;
    } else {
      // filter the orders based on the selected search option
      switch (this.searchOption) {
        case 'id':
          this.filteredOrders = this.orders.filter((order: any) =>
            order.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'mealname':
          this.filteredOrders = this.orders.filter((order: any) =>
            order.menu.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'price':
          this.filteredOrders = this.orders.filter((order: any) =>
            order.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        default:
          // if the search option is not recognized, show all orders
          this.filteredOrders = this.orders;
          break;
      }
    }
  }

  ngOnChanges(): void {
    this.filterOrders();
  }


  createOrder() {
    this.orderservice.createOrderFromMenu(this.menuName, this.email, this.token, this.currency).subscribe(
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
  showQRCode(id: number): void {
    this.orderservice.getQRCodeImage(id).subscribe(
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
    this.orderservice.deleteOrder(id).subscribe(
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
