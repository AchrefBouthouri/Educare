import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  description : any;
  calories: any;
  price: any;
  name: any;
  menus : any ;
  id : any;
  showForm = false;
  newcalories:any;
  newprice:any;
  newdescription:any;
  newname:any;

  constructor(private service :   MenuService) { }

  createM(){
    this.service.creeMenu(this.name, this.description, this.price, this.calories).subscribe(
      (response) => {
        console.log('Menu Created', response);
        // Create list of menus
        this.menus.push(response);
        // Clear the form
        this.name = '';
        this.description = '';
        this.price = null;
        this.calories = null;
 
      },
      () => {
        console.error('Refused');
      }
    );
  }

  showUpdateForm(id: number) {
    this.id = id;
    this.showForm = true;
  }
  
  updateM() {
    const id = this.menus.id;
    this.service.updateMenu(this.id, this.name ,this.description, this.price, this.calories).subscribe(
        (response) => {
            console.log('Menu updated', response);
            this.showForm = false;
            // Reload the capacity list
            this.service.getAllMenus().subscribe(
                (response) => {
                    console.log('ALL menus', response);
                    this.menus = response;
                },
                (error) => {
                    console.error('Error getting menus', error);
                }
            );
        },
        (error) => {
            console.error('Menu update failed', error);
        }
    );
}



   
   
    ngOnInit(): void {
      this.service.getAllMenus().subscribe(res=>{
        console.log(res);
        this.menus = res;
  
      })  }
  
      deleteM(id: number) {
        this.service.deletemenu(id).subscribe(
          () => {
            console.log('Order Deleted', id);
            // Remove the deleted order from the list of orders
            this.menus = this.menus.filter((order: any) => order.id !== id);
          },
          () => {
            console.error('Refused');
          }
        );}
    
  }


