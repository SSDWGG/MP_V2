import React, { useEffect } from 'react';
import { Base64 } from 'js-base64';
import { Alert, Button, Card } from 'antd';
import {MrtcClientModal} from "@/pages/mrtcExample/modals/mrtc";
import {history} from "umi";

const createClientAndPullWithConfig = async (clientConfig: {appId: string, appSecret: string, mrtcUrl: string, userId: string}) => {
  const clientModal = new MrtcClientModal();
  await clientModal.createMrtcClientWithConfig(clientConfig, {});
  await clientModal.subscribe('audience');
}
const AudiencePage: React.FC = (props) => {
  const { location } = props as { location?: any };
  const { search } = location;
  console.log(Base64.decode(search.slice(6)), '0009000');

  const clientConfig = JSON.parse(Base64.decode(search.slice(6)));

  useEffect(() => {
    if (clientConfig.mrtcUrl) {
      createClientAndPullWithConfig(clientConfig);
    }
  }, [clientConfig]);

  return (
    <div>
      <Alert
        message={
          <div>
            <div
              style={{
                display: 'inline-block',
                lineHeight: '20px',
                fontSize: '20px',
                fontWeight: 'bolder',
                color: '#FFF',
                textShadow: '5px 5px 5px #ECECEC',
              }}
            >
              <Button type='link' onClick={() => history.push("/mrtcExample")}>
                <span style={{ color: '#fff' }}>MRTC WEB SDK EXAMPLE</span>
              </Button>
            </div>
          </div>
        }
        banner
        showIcon={false}
        style={{ backgroundColor: '#2F3437' }}
      />

      <Card
        bordered={false}
        bodyStyle={{
          backgroundColor: '#222426',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: document.documentElement.clientHeight,
        }}
      >
        <video
          width="100%"
          height="100%"
          muted
          controls
          autoPlay
          id="audience"
          poster={`/videoPoster.jpeg`}
        />
      </Card>
    </div>
  );
};
export default AudiencePage;
