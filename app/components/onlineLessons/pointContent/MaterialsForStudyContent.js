import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DIALOG } from 'constants';
import { Button } from 'antd';
import classNames from 'classnames';
import style from './MaterialsForStudyContent.scss';

class MaterialsForStudyContent extends Component {
    static propTypes = {
        point: PropTypes.object,
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func)
    }

    getMaterials = () => {
        const {showDialog, actions: {getMaterials}} = this.props;
        getMaterials().then(() => showDialog(DIALOG.MATERIAL)());
    }

    onRemove = () => {
        const {actions: {removeSelectedMaterial}} = this.props;
        removeSelectedMaterial();
    }

    render() {
        const ulClassName = classNames('col-md-10 col-lg-9 offset-md-2 offset-lg-1', style.materialsContainer);
        const liClassName = classNames(style.material);
        const {point: {selectedMaterial}} = this.props;
        return (
            <Fragment>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1">
                        <Button htmlType="button" onClick={this.getMaterials} name="sectionButton" type="primary" ghost>添加素材</Button>
                    </div>
                </div>
                {
                    selectedMaterial &&
                    <div className="row inputRow">
                        <ul className={ulClassName}>
                            <li className={liClassName}>
                                <span className="col-md-4">{selectedMaterial.name}</span>
                                <span className="col-md-4">{selectedMaterial.fileType}</span>
                                <span className="col-md-4 u-text-right"><Button onClick={this.onRemove} type="danger" ghost><i className="far fa-trash-alt"/></Button></span>
                            </li>
                        </ul>
                    </div>
                }
            </Fragment>
        );
    }
}

export default MaterialsForStudyContent;
