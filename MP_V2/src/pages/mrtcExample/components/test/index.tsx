import { Alert, Button, Card, } from 'antd'
import type {FormInstance} from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {MenuUnfoldOutlined} from '@ant-design/icons';
import { createClientAndGetStream } from '@/pages/mrtcExample/ultis/ultis';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    formRef.current?.setFieldsValue({appId, appSecret});
  }, [])

  return (
    <div className='home'>
      <Alert
        message={
          <div>
            <MenuUnfoldOutlined onMouseOver={() => setVisible(true)} style={{marginRight: 12, marginBottom: 16, marginTop: 18, color: '#FFF'}} />
            <div style={{ display: 'inline-block', lineHeight: '20px', fontSize: '20px', fontWeight: 'bolder', color: '#FFF', textShadow: '5px 5px 5px #ECECEC' }}>
              <Link to="/"><span style={{ color: '#fff' }}>MRTC WEB SDK EXAMPLE</span></Link>
            </div>
          </div>
        }
        banner
        showIcon={false}
        // type='warning'
        style={{ backgroundColor: '#2F3437',}}
      />
      <div style={visible ? {width: 200, height: '100%', position: 'absolute', top: 64, left: 0, zIndex: 1, backgroundColor: '#2F3437'} : {display: 'none'}} onMouseLeave={() => setVisible(false)}>
        <ul>
          <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #222426' ,borderBottom: '1px solid #222426'}}>
            <Link to="/multiStream" style={{color: '#FFF'}}>推/拉多路流</Link>
          </div>
          <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #222426'}}>
            <Link to="/desktopShare" style={{color: '#FFF'}}>桌面/摄像头混流</Link>
          </div>
          {/* <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #222426'}}>
            <Link to="/multiInput" style={{color: '#FFF'}}>多种流输入推流</Link>
          </div> */}
        </ul>
      </div>

      <Card bordered={false} bodyStyle={{backgroundColor: "#222426", height: document.documentElement.clientHeight}}>
        <div>
          <video id='testVideo' width={320} height={180} muted autoPlay  />
        </div>
        <div>
          <audio style={{width: 240}} controls id="audioFileTest" crossOrigin="anonymous" src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3"></audio>
        </div>
        <div>
          <Button
            onClick={async () => {
              await createClientAndGetStream('mrtc://mdc-api.test.mudu.tv/live/0lH1YxAEY', 5, 'testVideo', 'audioFileTest')
            }}
          >预览</Button>
        </div>
      </Card>
    </div>
  )
}
export default Home;