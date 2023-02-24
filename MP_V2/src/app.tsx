import {  Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import { history, RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { getTokenKey } from './common/utils';
import Footer from './components/Footer';
import RightContent from './components/RightContent';
import { queryCurrentUser } from './services/user';
import { SocketInfo } from '@/util/info';
import { SmileOutlined } from '@ant-design/icons';


const loginPath = '/user/login';
const openSocket = async (userid: number) => {
  if (typeof WebSocket == 'undefined') {
    message.error('您的浏览器不支持WebSocket');
    return;
  }

  const socketUrl = SocketInfo.socketAllUserUrl + userid;
  let socket: any;
  // 关闭之前的ws
  if (socket != null) {
    socket.close();
    socket = null;
  }
  socket = await new WebSocket(socketUrl);
  //打开事件
  socket.onopen = function () {
    console.log('websocket已打开');
  };
  //获得消息事件
  socket.onmessage = function (msg: any) {
    let data = JSON.parse(msg.data);
    notification.open({
      message: `编号${data.userId.substring(data.userId.length - 4)}向您发来一条新消息~`,
      description: `${data.content}`,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      duration: 0,
    });
    //发现消息进入,开始处理前端触发逻辑
  };
  //关闭事件
  socket.onclose = function () {
    console.log('websocket已关闭');
  };
  //发生了错误事件
  socket.onerror = function () {
    console.log('websocket发生了错误');
  };

  return socket;
};


/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: user;
  fetchUserInfo?: () => Promise<user | undefined>;
  socket?:any;
  openSocket?: (userid: number) => Promise<any>
}> {
  const { pathname } = history.location;
  const localToken = localStorage.getItem(getTokenKey('ryw'));
  // 没 token 走非登录页的都转到登录
  if (!localToken && !pathname.includes('/login') && !pathname.includes('/register')) {
    history.replace(loginPath);
  }

  const fetchUserInfo = async () => {
    const msg = await queryCurrentUser();    
    if (!!msg.data.userid) {
      return msg.data;
    } else {
      // token无效的去登录页
      message.error('账号不存在');
      history.replace(loginPath);
      localStorage.removeItem(getTokenKey('ryw'));
      return undefined;
    }
  };
  // 有token走非登陆页的验证token  （刷新，或者直接访问非开放页面的情况）
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    if (!currentUser) {
      // 验证token的借口，验证成功返回用户信息，验证失败不返回值
      message.error('账号已禁用，请联系管理员');
      localStorage.removeItem(getTokenKey('ryw'));
      return {
        fetchUserInfo,
        settings: {},
      };
    } else {

// 用户登录或刷新通过校验 连接socket


 // 接入socket
 let socket = await openSocket(currentUser.userid);

      return {
        fetchUserInfo,
        currentUser,
        settings: {},
        socket,
        // 因为这里的socket后端使用的是set存储，所以即使是多次连接也没有问题
        openSocket,
      };
    }
  }
  
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: `${initialState?.currentUser?.watermark || ''}`,
    },
    footerRender: () => <Footer />,
    title: initialState?.currentUser?.username,
    logo: initialState?.currentUser?.avatar || undefined,


    // onPageChange: () => {
    //   // 直接登录
    //   const { location } = history;
    //   // 如果没有登录（且非登录注册页面），重定向到 login
    //   if (
    //     !initialState?.currentUser &&
    //     location.pathname !== '/user/register' &&
    //     location.pathname !== loginPath
    //   ) {
    //     message.warning('登录凭证已失效，请重新登陆');
    //     history.replace(loginPath);
    //   }
    // },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {/* 使用路由检查筛选 */}
    //       {!props.location?.pathname?.includes('/user') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => (
    //                {
    //               ...preInitialState,
    //               settings,
    //             }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  console.log(111111,error);
  
  const { response, request, data } = error;
  // @ts-ignore
  if (!request || request.options.skipErrorHandler) throw error;
  if (response && response.status) {
    const { status } = response;
    if (status === 401) {
      // 前进后退路由也进行判断
      const { query = {} } = history.location;
      const { redirect } = query;
      if (!window.location.pathname.includes('/login') && !redirect) {
        message.error('token 过期，请重新登录');
        history.replace('/user/login');
      } else {
        message.error(data.message || '无效的token');
      }
    }
  } else {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  throw error;
};

// 加Token的拦截器
const requestTokenInterceptor = (url: string, options: RequestOptionsInit) => {
  const { headers } = options;
  const token = localStorage.getItem(getTokenKey('ryw'));
  // token不存在，重定向到 login
  if (
    !token &&
    location.pathname !== '/user/register' &&
    location.pathname !== '/user/forget' &&
    location.pathname !== loginPath
  ) {
    message.warning('无登录凭证，请重新登陆');
    history.replace(loginPath);
    return {};
  } else {
    return {
      url: `${url}`,
      options: {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${token || ''}`,
          isolate: 'none',
          token: `${token || ''}`,
        },
      },
    };
  }
};

// 请求响应器查询token是否失效
const responseTokenInterceptors = (response: Response, options: RequestOptionsInit) => {
  if (
    response.status == 403 &&
    location.pathname !== '/user/register' &&
    location.pathname !== '/user/forget' &&
    location.pathname !== loginPath
  ) {
    message.warning('账号登录凭证到期或无效，请重新登录');
    history.replace(loginPath);
    localStorage.removeItem(getTokenKey('ryw'));

  }

  return response;
  // 查询token是否失效，或者token不存在就在此处拦截
};
export const request: RequestConfig = {
  requestInterceptors: [requestTokenInterceptor],
  responseInterceptors: [responseTokenInterceptors],
  errorHandler,
};
