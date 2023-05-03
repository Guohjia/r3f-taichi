import {
  Button,
  message
} from 'antd';
// import YAY from '../assets/yay.jpg'
// import server from '../server'

import style from './login.less';

export const CLIENT_ID = '9d300717e9196fb7b135';
export const REDIRECT_URL = 'http://localhost:8080/oauth/github'

export default function HomePage() {
  const onLogin = () => {
    message.loading('登录中，请稍后..')
    window.location.href = ` https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
  }

  return (
    <div className={style.login}>
      <Button type="primary" onClick={onLogin} size="large">点我登录</Button>
    </div>
  );
}
