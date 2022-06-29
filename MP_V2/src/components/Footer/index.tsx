import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import { Info } from '@/util/info';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Ren体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ren',
          title: 'Ren',
          href: Info.github,

          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: Info.github,
          blankTarget: true,
        },
        {
          key: 'WGG',
          title: 'WGG',
          href: Info.github,
          blankTarget: true,
        },
      ]}
    />
  );
};
