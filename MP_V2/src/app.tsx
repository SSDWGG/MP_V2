import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import { history, RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { getTokenKey } from './common/utils';
import Footer from './components/Footer';
import RightContent from './components/RightContent';
import { queryCurrentUser } from './services/user';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

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
}> {
  const { pathname } = history.location;
  const localToken = localStorage.getItem(getTokenKey('ryw'));
  // 没 token 走非登录页的都转到登录
  if (!localToken && !pathname.includes('/login') && !pathname.includes('/register')) {
    history.replace(loginPath);
  }

  const fetchUserInfo = async () => {
    const msg = await queryCurrentUser();
    if (!!msg) {
      return msg;
    } else {
      // token无效的去登录页
      history.push(loginPath);
      message.error('账号已禁用，请联系管理员');
      // localStorage.removeItem(getTokenKey('ryw'));
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
      return {
        fetchUserInfo,
        currentUser,
        settings: {},
      };
    }
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: `${initialState?.currentUser?.username} waterMark`,
    },
    footerRender: () => <Footer />,
    title: initialState?.currentUser?.username,

    onPageChange: () => {
      // 直接登录
      const { location } = history;
      // 如果没有登录（且非登录注册页面），重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/user/register') {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
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
  // 取浏览器中存储的token
  const token = localStorage.getItem(getTokenKey('ryw'));
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
};

const guestRequestInterceptor = (url: string, options: RequestOptionsInit) => {
  return {
    url: `${url}`,
    options: {
      ...options,
    },
  };
};
export const request: RequestConfig = {
  requestInterceptors: [requestTokenInterceptor, guestRequestInterceptor],
  errorHandler,
};
