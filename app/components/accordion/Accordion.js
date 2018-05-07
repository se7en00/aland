import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cn from 'classnames';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.preExpandedItems = this.preExpandedItems.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    state={
        allowMultiple: false,
        activeItems: this.preExpandedItems()
    }

    static propTypes = {
        component: PropTypes.string,
        className: PropTypes.string,
        allowMultiple: PropTypes.bool, //Allow multiple items to be open at the same time.
        activeItems: PropTypes.array,
        onChange: PropTypes.func,
        children: PropTypes.node,
        theme: PropTypes.shape({
            accordion: PropTypes.string
        })
    };

    static defaultProps = {
        component: 'div',
        className: '',
        allowMultiple: false,
        activeItems: [],
        onChange: () => {}
    };

    static childContextTypes = {
        theme: PropTypes.object
    };

    getChildContext() {
        return { theme: this.props.theme };
    }

    componentWillReceiveProps(nextProps) {
        if (!R.equals(nextProps.activeItems, this.state.activeItems)) {
            let newActiveItems;
            if (!nextProps.allowMultiple) {
                newActiveItems = nextProps.activeItems.length
                    ? [nextProps.activeItems[0]]
                    : [];
            } else {
                newActiveItems = nextProps.activeItems.slice();
            }
            this.setState({
                activeItems: newActiveItems
            });

            nextProps.onChange(nextProps.allowMultiple ? newActiveItems : newActiveItems[0]);
        }
    }

    preExpandedItems() {
        let activeItems = [];
        React.Children.map(this.props.children, (item, index) => {
            if (item.props.expanded) {
                if (!this.props.allowMultiple) {
                    if (activeItems.length === 0) activeItems.push(item.props.customKey || index);
                } else {
                    activeItems.push(item.props.customKey || index);
                }
            }
        });
        if (activeItems.length === 0 && this.props.activeItems.length !== 0) {
            activeItems = this.props.allowMultiple ? this.props.activeItems.slice() : [this.props.activeItems[0]];
        }
        return activeItems;
    }


    handleClick(key) {
        let activeItems = this.state.activeItems;
        if (!this.props.allowMultiple) {
            //if not support multiple expanded item, we only expand the unexpanded item, if it's expanded(active), close it!
            activeItems = activeItems[0] === key ? [] : [key];
        } else {
            activeItems = [...activeItems];
            const index = activeItems.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                // remove active state
                activeItems.splice(index, 1);
            } else {
                activeItems.push(key);
            }
        }
        this.setState({
            activeItems
        });

        this.props.onChange(this.props.allowMultiple ? activeItems : activeItems[0]);
    }

    renderItems() {
        const { allowMultiple, children } = this.props;
        return React.Children.map(children, (item, index) => {
            const key = item.props.customKey || index;
            const expanded = (this.state.activeItems.indexOf(key) !== -1) && (!item.props.disabled);

            return React.cloneElement(item, {
                disabled: item.props.disabled,
                allowMultiple,
                expanded,
                key: `accordion__item-${key}`,
                onClick: this.handleClick.bind(this, key)
            });
        });
    }

    render() {
        const { component: Component, theme, className } = this.props;
        const classNames = cn(theme.accordion, className);
        return (
            <Component className={classNames}>
                {this.renderItems()}
            </Component>
        );
    }
}

export default Accordion;

