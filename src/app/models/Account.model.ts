import {Role} from "./Role.model";

export class Account {
  id: string | undefined;
  email: string;
  password: string;
  role: Role;

  constructor(id: string | undefined, email: string, password: string, role: any) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
