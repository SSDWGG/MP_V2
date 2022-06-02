import { message } from 'antd';
// import copy from 'copy-to-clipboard';
import produce from 'immer';
import { sampleSize } from 'lodash';

export * from './interval';
export * from './is';
export const liveRouteReg = /live\/(\w+?)\//;
export const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
export const numberReg = /^[+]{0,1}(\d+)$/;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function download(name: string, url: string, callback?: () => void): void {
  const image = new Image(); // crossorigin 是HTML5中新增的<img>标签属性 //　crossorigin属性有两个值可选： //anonymous:如果使用这个值的话就会在请求中的header中的带上origin属性，但请求不会带上cookie和其他的一些认证信息。 //use-credentials:这个同时会在跨域请求中带上cookie和其他的一些认证信息。在使用这两个值时都需要server端在response的header中带上Access-Control-Allow-Credentials属性。可以通过server的配置文件来开启这个属性：server开启Access-Control-Allow-Credentials
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');
    context!.drawImage(image, 0, 0, image.width, image.height);
    // const url = canvas.toDataURL('image/png');
    // 生成一个a元素
    canvas.toBlob(
      function (blob: any) {
        const eleLink = document.createElement('a');
        eleLink.download = name;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
        callback?.();
      },
      'image/png',
      1,
    );
  };
  image.src = url;
}
export async function handleParams(p: any, request: any, isFilter: boolean = true) {
  const params = { ...p };
  isFilter &&
    Object.keys(params).forEach((key) => {
      switch (key) {
        case 'page':
          params.page = params.current || 0;
          delete params.current;
          break;
        case 'perPage':
          params.perPage = params.pageSize || 0;
          delete params.pageSize;
          break;
        default:
          break;
      }
      if (params[key] === 'ALL') {
        delete params[key];
      }
    });
  const res = await request(params);
  return {
    data: res.data.items,
    pageSize: res.data.perPage,
    current: res.data.page,
    total: res.data.total,
  };
}

interface SourceFunction {
  (...args: any[]): any;
}

interface TargetFunction {
  (...args: any[]): void;
}
export function getBase64(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function debounce(fun: SourceFunction, delay: number = 500): TargetFunction {
  // 使用类型推断
  let timer: ReturnType<typeof setTimeout>;
  return async function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(fun(...args));
      }, delay);
    });
  };
}
export function getTokenKey(Params: string) {
  return `${Params}_V2_token`;
}
//导出
export async function downFile(result: any, fileName: string) {
  const blob = new Blob([result], {
    type: 'application/vnd.ms-excel',
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.download = fileName + '.xlsx';
  link.click();
  window.URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
  message.success('导出成功');
}
export function getLocation(url: string) {
  return isProd() ? `${location.protocol}//${location.hostname}/${url}` : `https://xxxxxxxx/${url}`;
}

export function isProd(): boolean {
  return process.env.NODE_ENV === 'production';
}
export function handleImageUrl(values: any, key: string) {
  if (values[key]?.[0].thumbUrl) {
    values[key] = values[key]?.[0].thumbUrl;
  } else if (values[key]?.[0].defaultUrl) {
    values[key] = '';
  } else {
    delete values[key];
  }
}
export const formatter = {
  formatter: ({ count, maxLength: _maxLength }: { count: number; maxLength?: number }) => {
    if (!_maxLength) return '';
    return _maxLength - count;
  },
};
// 毫秒转HH:mm:ss
export function millisecondFormatDate(ms: number, isMs = false) {
  // nan使用typeof判断是数字
  if (typeof ms === 'number' && !isNaN(ms)) {
    const seconds = isMs ? ms / 1000 : ms;
    const padZero = (v: number) => {
      if (v >= 10) return v.toString();
      return `0${v}`;
    };
    const h = Math.floor((seconds / 3600) % 24);
    const m = Math.floor((seconds / 60) % 60);
    const s = Math.floor(seconds % 60);
    return `${padZero(h)}小时${padZero(m)}分钟${padZero(s)}秒`;
  } else {
    return '暂无数据';
  }
}
/**
 * 随机字符串（只包含大小写英文字母以及数字）
 * @param len 长度
 */
export function randomStr(len: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return sampleSize(characters, len).join('');
}
/**
 * 在数组中交换元素
 */
export function swapElement<T>(list: T[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return list;
  const newList = produce(list, (draft) => {
    const temp = draft[fromIndex];
    draft[fromIndex] = draft[toIndex];
    draft[toIndex] = temp;
  });
  return newList;
}
