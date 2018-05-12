import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class AuthorizedRoute extends React.Component {
    static propTypes = {
        component: PropTypes.node.isRequired
    };

    render() {
        const {
            component: Component,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={props => //eslint-disable-line
                    localStorage.getItem('token')
                        ? <Component {...props}/>
                        : (
                            <Redirect to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}/>
                        )
                }
            />
        );
    }
}

export default AuthorizedRoute;
