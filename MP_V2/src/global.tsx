import { Button, message, notification } from 'antd';
import { useIntl } from 'umi';
import defaultSettings from '../config/defaultSettings';

const { pwa } = defaultSettings;
const isHttps = document.location.protocol === 'https:';

const clearCache = () => {
  // remove all caches
  if (window.caches) {
    caches
      .keys()
      .then((keys) => {
        keys.forEach((key) => {
          caches.delete(key);
        });
      })
      .catch((e) => console.log(e));
  }
};



const bg3=() =>{
  let rs = Math.floor(Math.random() * (170 - 100) + 100);
  let gs = Math.floor(Math.random() * (170 - 100) + 100);
  let bs = Math.floor(Math.random() * (100 - 90) + 90);
  return "rgb(" + rs + ',' + gs + ',' + bs + ")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
}

// if pwa is true
if (pwa) {
  // Notify user if offline now
  window.addEventListener('sw.offline', () => {
    message.warning(useIntl().formatMessage({ id: 'app.pwa.offline' }));
  });

  // Pop up a prompt on the page asking the user if they want to use the latest version
  window.addEventListener('sw.updated', (event: Event) => {
    const e = event as CustomEvent;
    const reloadSW = async () => {
      // Check if there is sw whose state is waiting in ServiceWorkerRegistration
      // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
      const worker = e.detail && e.detail.waiting;
      if (!worker) {
        return true;
      }
      // Send skip-waiting event to waiting SW with MessageChannel
      await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (msgEvent) => {
          if (msgEvent.data.error) {
            reject(msgEvent.data.error);
          } else {
            resolve(msgEvent.data);
          }
        };
        worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
      });

      clearCache();
      window.location.reload();
      return true;
    };
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
          reloadSW();
        }}
      >
        {useIntl().formatMessage({ id: 'app.pwa.serviceworker.updated.ok' })}
      </Button>
    );
    notification.open({
      message: useIntl().formatMessage({ id: 'app.pwa.serviceworker.updated' }),
      description: useIntl().formatMessage({ id: 'app.pwa.serviceworker.updated.hint' }),
      btn,
      key,
      onClose: async () => null,
    });
  });
} else if ('serviceWorker' in navigator && isHttps) {
  // unregister service worker
  const { serviceWorker } = navigator;
  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then((sws) => {
      sws.forEach((sw) => {
        sw.unregister();
      });
    });
  }
  serviceWorker.getRegistration().then((sw) => {
    if (sw) sw.unregister();
  });

  clearCache();
}

let as = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法制", "爱国", "敬业", "诚信", "友善"]
document.onclick = function (e) {
    let spans = document.createElement("h6")
    // span.innerHTML = "<img src="+a[Math.floor(Math.random()*a.length)]+">"
    spans.innerHTML = as[Math.floor(Math.random() * as.length)]
    spans.style.position = "absolute"
    spans.style.color = bg3()
    spans.style.transition = ".5s"
    spans.style.left = e.clientX - 10 + "px"
    spans.style.top = e.clientY -27 + "px"
    setTimeout(function () {
        spans.style.opacity = "1"
        spans.style.transform = "translateY(-50px) scale(1.5)"
    }, 100)
    setTimeout(function () {
        spans.style.opacity = "0"
        spans.style.transform = "translateY(-200px) scale(0)"
    }, 500)
    setTimeout(function () {
        let chi = document.getElementsByTagName("spans")
        for (let i = 0; i < chi.length - 1; i++) {
            if (chi[i].style.opacity == "0") {
                alert()
            }
        }
    }, 1000)
    document.body.appendChild(spans)
}
// }, 1000);
