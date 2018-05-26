import React from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';

const PanelHeader = ({title}) => (
    <header className={panelStyle.panel__header}>
        <h4>{title}</h4>
    </header>
);

PanelHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PanelHeader;
