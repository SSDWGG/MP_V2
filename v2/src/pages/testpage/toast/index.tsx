import { Result, Button } from 'antd';
import 'animate.css';
import { useState } from 'react';
import ToastProvider from './SandBoxToast/ToastProvider';
import Example from './SandBoxToast/Example';
import Toast from './MyToast';
import ButtonGroup from 'antd/lib/button/button-group';

const toast: React.FC = () => {
  const [visable, setVisable] = useState(true);

  return (
    <Result
      status="403"
      style={{
        background: 'none',
      }}
      subTitle="测试toast组件功能"
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              setVisable((vis) => {
                return !vis;
              });
            }}
          >
            test animated
          </Button>
          {visable && (
            <h1
              className={`animate__animated ${
                visable ? 'animate__fadeInDownBig' : 'animate__fadeOutDownBig'
              }`}
            >
              hahahahah
            </h1>
          )}
          <ButtonGroup>
            <Button
              type="primary"
              onClick={() => {
                Toast.info('普通提示');
              }}
            >
              普通提示
            </Button>
            <Button
              onClick={() => {
                const hideLoading = Toast.loading('加载中...', 0, () => {
                  Toast.success('加载完成');
                });
                setTimeout(hideLoading, 2000);
              }}
            >
              加载提示
            </Button>
          </ButtonGroup>
          <ToastProvider>
            <Example />
          </ToastProvider>
        </>
      }
    />
  );
};
export default toast;
