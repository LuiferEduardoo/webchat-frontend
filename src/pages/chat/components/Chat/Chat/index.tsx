import React from 'react';
import { useLocation } from 'react-router-dom';

import ChatNotSelected from './ChatNotSelectd';
import {Content} from './Content';

const Chat: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const isGroup = pathSegments[1] === 'group';
  const identifier = isGroup ? pathSegments[2] : pathSegments[1];


  return !identifier ? <ChatNotSelected /> : <Content isGroup={isGroup} identifier={identifier} />;
};

export default Chat;