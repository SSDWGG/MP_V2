declare namespace UserType {
  interface ParamsLogin {
    username: string;
    password: string;
  }
  interface ParamsAddUser {
    username: string;
    password: string;
    email: string;
  }

  interface ResLogin extends ResBase {
    data: user[];
    token: string;
  }
}
