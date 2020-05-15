export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  admin: boolean ;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    admin: boolean
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    if (admin) {
      this.role = ["admin"];
    } else {
      this.role = ["user"];
    }
  }
}
