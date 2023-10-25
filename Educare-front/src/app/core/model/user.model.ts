import {Role} from "./role.model";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role:string;

  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.role = Role.name;
  }
}
