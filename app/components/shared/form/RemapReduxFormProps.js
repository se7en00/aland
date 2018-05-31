import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const remapReduxFormProps = (WrappedComponent) => class WithRemappedCustomProps extends React.Component {
        static propTypes = {
            input: PropTypes.shape({
                customProps: PropTypes.object
            })
        };

        render() {
            const props = {
                ...this.props,
                ...this.props.input.customProps,
                input: {
                    ...R.omit(this.props.input, 'customProps')
                }
            };

            return (
                <WrappedComponent {...props}/>
            );
        }
};

export default remapReduxFormProps;
