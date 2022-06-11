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
  scrolltip?: string;
  todoclassify?: string;
  tags?: string;

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
  remark: string;

  createTime?: string;
  updateTime?: string;
  version?: number;
  deleted?: number;
}
