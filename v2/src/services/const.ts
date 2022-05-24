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
  createTime?: number;
  isAdmin?: string;
  address?: string;
}
interface todo {
  todoid: number;
  todotitle: string;
  tododescribe: string;
  beginTime: string;
  endTime: string;
  okflag: number;
  infactendTime: string;
  schedule: number;
}
