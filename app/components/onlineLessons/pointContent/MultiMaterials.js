import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DIALOG } from 'constants';
import { Button } from 'antd';
import MultiMaterialsTable from './MultiMaterialsTable';

class MultiMaterials extends Component {
    static propTypes = {
        point: PropTypes.object,
        showDialog: PropTypes.func,
        materialsList: PropTypes.array,
        actions: PropTypes.objectOf(PropTypes.func)
    }

    getMaterials = () => {
        const {showDialog, actions: {getMaterials}} = this.props;
        getMaterials().then(() => showDialog(DIALOG.MULTIPLE_MATERIAL)());
    }

    onRemove = (material) => {
        const {actions: {removeSelectedMaterial}} = this.props;
        removeSelectedMaterial();
    }

    render() {
        const {point, materialsList, showDialog, actions} = this.props;
        const hasMterialsList = materialsList && materialsList.length > 0;
        return (
            <Fragment>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1">
                        <Button htmlType="button" onClick={this.getMaterials} name="sectionButton" type="primary" ghost>添加素材</Button>
                    </div>
                </div>
                {
                    hasMterialsList &&
                    <MultiMaterialsTable
                        courseId={point?.pointContent?.courseId}
                        pointId={point?.pointContent?.pointId}
                        actions={actions}
                        showDialog={showDialog}
                        dataSource={materialsList}
                    />
                }
            </Fragment>
        );
    }
}

export default MultiMaterials;
