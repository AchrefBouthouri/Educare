import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../../core/service/role/role.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Role} from "../../../../../core/model/role.model";

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  roles:Role[] = [];


  constructor(private roleService: RoleService) {}
  ngOnInit(): void {
    this.roleService.getRoles().subscribe(roles =>{
      this.roles = roles;
      console.log(roles);
    });
  }

  onDeleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.roles = this.roles.filter(role => role.id !== id);
    });
  }


  add(event: MatChipInputEvent): void {
    const value = (event!.value || '').trim();
    if (value){
      let role = new Role()  ;
      role.name = value ;
      const index = this.roles.findIndex(eq => eq.name.toLowerCase() === value.toLowerCase())
      if (index === -1){
        this.roleService.addRole(role).subscribe(result => {
          this.roles.push(<Role>result);
          event.chipInput!.clear();
        })
      }
    }
  }


  protected readonly indexedDB = indexedDB;
}
