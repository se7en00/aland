import React from 'react';
import uuid from 'uuid/v4';
import { Select } from 'antd';

const Option = Select.Option;

export const courseStatusOptions = [
    {label: '所有', value: ''},
    {label: '创建中', value: '0'},
    {label: '创建', value: 1},
    {label: '审核', value: 2},
    {label: '通过未上架', value: 3},
    {label: '上架', value: 4},
    {label: '删除', value: 5}
].map(item => (
    <Option key={uuid()} value={item.value}>{item.label}</Option>
));

export const renderOptions = (list) => list.map(item =>
    (<Option key={uuid()} value={item.id}>{item.name}</Option>)
);

