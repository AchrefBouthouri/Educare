import { Component, OnInit } from '@angular/core';
import { FavoriService } from './favori.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})
export class FavoriComponent implements OnInit {
  menus : any
  mail :any
  favoris :any
  id : any
  showForm =false

  constructor(private f : FavoriService) { }

  ngOnInit(): void {
    this.f.getAllMenus().subscribe(res=>{
      console.log(res);
      this.menus = res;

    })  }
    showUpdateForm(id: number) {
      this.id = id;
      this.showForm = true;
    }
  
  
    createMenuPreference() {
      this.f.createMenuPreference(this.id, this.mail).subscribe(() => {
        // Reload the menus after the preference has been added
        this.f.getAllMenus().subscribe(menus => {
          this.menus = menus;
        });
        this.showForm = false;
      });
    }
  
  

}
