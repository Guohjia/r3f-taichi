import { Navigate, Outlet } from 'umi';
import queryString from 'query-string';

export default () => {
    const query = queryString.parse(window.location.search);
    const name = query.name;
    const islogin = !!name;

    if (islogin) {
        return <Navigate to="/" />;
    } else {
        return <Outlet />
    }
}
