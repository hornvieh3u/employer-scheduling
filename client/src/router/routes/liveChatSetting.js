import { lazy } from 'react';

const LiveChatSettingRoute = [
  {
    path: '/liveChatSetting',
    component: lazy(() => import('../../views/livechat/index'))
  }
];

export default LiveChatSettingRoute;
