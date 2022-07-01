import React from 'react';
import { Button } from 'antd';
import './index.less';
import { history } from 'umi';

const Void: React.FC = () => {
  return (
    <div id = "fcTest">
      <div className="mzsm">
        <p>
          <strong>测试：</strong>
        </p>
        <p>本页面为空路由的空白测试页面</p>
      </div>

      <Button
        type="dashed"
        onClick={() => {
          history.push('/');
        }}
      >
        跳转 /
      </Button>
    </div>
  );
};
export default Void;
