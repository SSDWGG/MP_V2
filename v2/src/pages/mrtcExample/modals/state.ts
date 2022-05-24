import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import produce from 'immer';

export interface callbackItem {
  name: string; // 对应state里的key
  callback: (T: any) => void; // 回调函数
}

// 这个文件是整个项目的数据管控核心

const assign = produce((draft, part) => {
  Object.assign(draft || {}, part);
});

class State<T> {
  protected callbacks: callbackItem[] = [];
  protected state$: BehaviorSubject<T>;
  get state() {
    return this.getState();
  }

  constructor(state: T) {
    this.state$ = new BehaviorSubject(assign(state, {}));
  }

  public select<V>(selectFn: (state: T) => V): Observable<V> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }

  public getState(): T {
    return this.state$.value;
  }

  set = (state: T) => {
    this.setState({ ...state });
  };

  setState(state: Partial<T> | ((state: T) => void)): void {
    const original = this.getState();

    if (original === state) {
      return;
    }

    const newState = typeof state === 'function' ? produce(original, state) : assign(original, state);

    this.state$.next(newState);

    this.callbacks.map((item: callbackItem) => {
      const { name, callback } = item;
      if (!this.state$.value.hasOwnProperty(name)) return;
      callback(newState[name]);
    });
  }

  on(name: string, callback: () => void) {
    if (!this.state$.value.hasOwnProperty(name)) return;

    this.callbacks.push({ name, callback });
  }
}

export { State };
