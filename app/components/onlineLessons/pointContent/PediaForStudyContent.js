import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderOptions } from 'constants';
import { List } from 'antd';
import { renderSelectField, renderQuill } from '../../shared/form';

class PediaForStudyContent extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        point: PropTypes.object
    }

    state = {allSelectedPedias: []}

    componentWillReceiveProps(nextProps) {
        const {point: {selectedPedia, pedias}} = nextProps;
        if (selectedPedia) {
            const selectedItems = pedias?.elements.filter(pedia => pedia.id === selectedPedia.id);
            this.setState({allSelectedPedias: selectedItems});
        }
    }


    renderPediaOptions = (values) => {
        if (!values || !values?.elements || !values.elements.length) return null;
        return renderOptions('id', 'subject')(values.elements);
    }

    filterPedias = (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0

    onChange= (value) => {
        const {point: {pedias}} = this.props;
        const selectedItems = pedias?.elements.filter(pedia => pedia.id === value.key);
        this.setState({allSelectedPedias: selectedItems});
    }

    onDeselect = (value) => {
        const {allSelectedPedias} = this.state;
        this.setState({allSelectedPedias: allSelectedPedias.filter(item => item.id !== value.key)});
    }

    renderPediaList = () => {
        const {allSelectedPedias} = this.state;
        if (!allSelectedPedias.length) return null;
        return (
            <Fragment>
                <List
                    bordered={true}
                    className="col-md-10 offset-md-1 u-pull-down-md"
                    itemLayout="horizontal"
                    dataSource={allSelectedPedias}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.subject}
                                description={item.summary}
                            />
                        </List.Item>
                    )}
                />
                <Field
                    className="col-md-10 u-pull-down-md"
                    rowClassName="inputRow inputRow__richText"
                    name="prediaContent"
                    label="学习内容补充"
                    onlyTextEditable={true}
                    component={renderQuill}
                />
            </Fragment>
        );
    }

    render() {
        const {point: {pedias}} = this.props;
        return (
            <Fragment>
                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="pedias"
                    showSearch={true}
                    labelInValue={true}
                    onChange={this.onChange}
                    onDeselect={this.onDeselect}
                    filterOption={this.filterPedias}
                    component={renderSelectField}
                    placeholder="一点通"
                    label="一点通"
                >
                    {this.renderPediaOptions(pedias)}
                </Field>
            </Fragment>
        );
    }
}

export default PediaForStudyContent;
