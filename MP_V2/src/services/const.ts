interface user {
  userid: number;
  username: string;
  password: string;
  email: string;
  avatar?: string;
  title?: string;
  phone?: string;
  gender?: string;
  signature?: string;
  geographic?: string;
  admin?: number;
  address?: string;

  createTime?: string;
  updateTime?: string;
  version?: number;
  deleted?: number;
}
interface todo {
  todoid: number;
  userid: number;
  todotitle: string;
  tododescribe: string;
  okflag: number;
  infactendTime: string;
  beginTime: string;
  wantendTime: string;
  schedule: number;

  createTime?: string;
  updateTime?: string;
  version?: number;
  deleted?: number;
}
