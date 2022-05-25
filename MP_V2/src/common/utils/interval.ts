function fn2workerURL(fn: Function) {
  const blob = new Blob(['(' + fn.toString() + ')()'], {
    type: 'application/javascript',
  });
  return URL.createObjectURL(blob);
}

function intervalWorkerFn() {
  self.onmessage = ev => {
    const data = ev.data;
    let timer;

    switch (data.cmd) {
      case 'start': {
        timer = setInterval(function () {
          self.postMessage(Date.now());
        }, data.interval);
        break;
      }
      case 'stop': {
        timer && clearInterval(timer);
        break;
      }
      default: {
        throw new Error('Invalid cmd: ' + data.cmd);
      }
    }
  };
}

// 运行在 worker 中的 interval，普通 interval 当浏览器切到后台时候会变得极其不准确，worker 中则不会
export function interval(
  cb: (timestamp: number) => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  if (options && options.immediate) {
    cb(Date.now());
  }

  // 兼容性判断
  if ('Worker' in window) {
    const worker = new Worker(fn2workerURL(intervalWorkerFn));

    worker.postMessage({ cmd: 'start', interval: delay });
    worker.onmessage = ev => {
      cb(ev.data);
    };

    return () => worker.terminate();
  } else {
    const timer = setInterval(() => {
      cb(Date.now());
    }, delay);

    return () => clearInterval(timer);
  }
}
