import { Outlet, Navigate } from 'umi';
import queryString from 'query-string';
import { message } from 'antd';

import {
    getAccessToken,
    // getUserInfo
} from '../server';

export default () => {
    const query = queryString.parse(window.location.search);
    const code = query.code;

    if (code) {
        getAccessToken(code).then(() => {

        }).catch((error) => {
            message.error(error.message || 'github oauth 登录异常，请稍后重试！')
            return <Navigate to="/login" />;
        });
    } else {
        return <Navigate to="/login" />;
    }
    console.log('query', query)
    // const { isLogin } = useAuth();
    // if (isLogin) {
      return <Outlet />;
    // } else{
    //   return <Navigate to="/login" />;
    // }
}
