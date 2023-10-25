import { Component, OnInit } from '@angular/core';
import { MenuDeSemaine } from './menu-de-semaine.service';



@Component({
  selector: 'app-menu-de-semaine',
  templateUrl: './menu-de-semaine.component.html',
  styleUrls: ['./menu-de-semaine.component.css']
})
export class MenuDeSemaineComponent implements OnInit {
  menus : any 

  constructor(private mds : MenuDeSemaine) { }

  ngOnInit(): void {
    this.mds.getAllMenus().subscribe(res=>{
      console.log(res);
      this.menus = res;
  })}

}
