export class AuthDTO {
  email: string;
  password: string;
  user_id: string;
  access_token: string;

  constructor(
    email: string,
    password: string,
    user_id: string,
    access_token: string
  ) {
    this.user_id = user_id;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
  }

  static new() {
    return new AuthDTO("", "", "", "");
  }
}
