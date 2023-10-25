import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus : any

  constructor(private ms : MenuService) { }

  ngOnInit(): void {
    this.ms.getAllMenus().subscribe(res=>{
      console.log(res);
      this.menus = res;

    })  }

}
