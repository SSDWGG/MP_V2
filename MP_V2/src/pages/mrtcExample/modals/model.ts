// @ts-ignore
import { State } from './state';
import { Observable } from 'rxjs';
import { cloneDeep, merge } from 'lodash';

export interface ModelUpdateMap {
  // 需要更新的state对应的key，支持路径，格式为A.B.C，例如config.basic
  [K: string]: {
    updateKey?: string; // 更新对应的key
    backend: (v: any) => Observable<any>; // 更新的backend方法
    params: () => any; // backend所需的参数
    transform?: (v: any) => any; // 转换函数
    updateKeyValue?: (key: string) => any; // 更新key-value
  };
}

export abstract class Model<T> extends State<T> {
  UPDATE_MAPS: ModelUpdateMap;

  constructor(state: T) {
    super(state);
  }
  /**
   * @description: 更新state里对应的值
   * @param {string} key 需要更新的键名，不传的话，更新UPDATE_MAPS里所有的
   * @return {boolean}
   */
  async updateKeys(keys?: string | string[]): Promise<any> {
    if (!this.UPDATE_MAPS) {
      return Promise.resolve(false);
    }

    // keys为空
    if (!keys) {
      return this.updateItems(Object.keys(this.UPDATE_MAPS));
    }
    // keys为字符串
    if (typeof keys === 'string') {
      return this.updateItem(keys);
    }
    // keys为数组
    if (Object.prototype.toString.call(keys) === '[object Array]') {
      return this.updateItems(keys);
    }
    // 其他情况
    return Promise.resolve(false);
  }

  private async updateItems(keys: string[]): Promise<any> {
    const promises = [];
    for (const key of keys) {
      promises.push(this.updateItem(key));
    }
    return Promise.all(promises);
  }

  private isKeyInMaps(key: any) {
    return typeof key === 'string' && key in this.UPDATE_MAPS;
  }

  private async updateItem(key: string): Promise<any> {
    return new Promise((resolve) => {
      if (!this.isKeyInMaps(key)) {
        resolve(false);
      }
      const configBackend = this.UPDATE_MAPS[key];
      configBackend.backend(configBackend.params()).subscribe((v: any) => {
        let stateClone = cloneDeep(this.getState());
        if (configBackend?.transform) {
          v = configBackend?.transform(v);
        }
        if (this.UPDATE_MAPS[key]?.updateKey) {
          key = this.UPDATE_MAPS[key].updateKey;
        }
        console.log('@@@oldState:', stateClone);
        stateClone = merge(stateClone, { [key]: v });
        console.log('@@@newState:', stateClone);
        this.setState(stateClone);
        resolve(v);
        return;
      });
    });
  }
}

/**
 * @description: 更新state对应的数据，支持路径
 * @param {ModelUpdateMap} updateMaps 更新规则表
 * @return {*}
 */
export const connect = (updateMaps: ModelUpdateMap) => {
  return (target) => {
    target.prototype.UPDATE_MAPS = updateMaps;
  };
};

export abstract class AModel {
  abstract init(config?: any): Promise<boolean>;
  abstract destroy(): void;
}
