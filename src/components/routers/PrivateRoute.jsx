import { useSelector } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const accessToken = useSelector(state => state.token.token)

    return (
        <Route {...rest} render={props => (
            accessToken ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;