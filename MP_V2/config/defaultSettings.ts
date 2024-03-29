import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = 
// {
//   navTheme: 'light',
//   // 拂晓蓝
//   primaryColor: '#1890ff',
//   layout: 'mix',
//   contentWidth: 'Fluid',
//   fixedHeader: false,
//   fixSiderbar: true,
//   colorWeak: false,
//   title: 'WGG_V2',
//   pwa: false,
//   logo: '/rabbit.jpg',
//   iconfontUrl: '',
// };
{
  'navTheme': "dark",
  'layout': "side",
  "contentWidth": "Fluid",
  "headerHeight": 48,
  "primaryColor": "#1890ff",
  "splitMenus": false,
  "fixedHeader": true,
  "fixSiderbar": true,
  title: 'WGG_V2',
  pwa: false,
  logo: '/rabbit.jpg',
  iconfontUrl: '',
}

export default Settings;
