interface user {
  userid: number;
  username: string;
  password: string;
  email: string;
  avatar?: string;
  title?: string;
  phone?: string;
  gender?: string;
  watermark?: string;
  signature?: string;
  geographic?: string;
  admin?: number;
  address?: string;
  scrolltip?: string;
  todoclassify?: string;
  tags?: string;
  blackTime: string;
  lastip?:number|null

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
  classify?: string;

  createTime?: string;
  updateTime?: string;
  version?: number;
  deleted?: number;
}
interface memo {
  memoid: number;
  userid: number;
  title: string;
  cover: string;
  content: string;
  collapse:number;
  h5content:string

  createTime?: string;
  updateTime?: string;
  version?: number;
  deleted?: number;
}
