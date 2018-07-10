import React from 'react';
import uuid from 'uuid/v4';
import { Select } from 'antd';

const Option = Select.Option;

export const courseStatusOptions = [
    {label: '所有', value: ''},
    {label: '创建中', value: '0'},
    {label: '创建', value: 1},
    // {label: '审核', value: 2},
    // {label: '通过未上架', value: 3},
    {label: '上架', value: 4},
    {label: '删除', value: 5}
].map(item => (
    <Option key={uuid()} value={item.value}>{item.label}</Option>
));

export const studyContentsOptions = [
    {label: '图文信息', value: 'ARTICLE'},
    {label: '素材库选择', value: 'MEDIA'},
    {label: '链接', value: 'LINK'},
    {label: '一点通', value: 'PEDIA'},
    {label: '本地上传', value: 'UPLOAD'}
].map(item => (
    <Option key={uuid()} value={item.value}>{item.label}</Option>
));

export const fileTypeOptions = [
    {label: '视频', value: 'VIDEO'},
    {label: '图片', value: 'IMAGE'},
    {label: '音频', value: 'AUDIO'},
    {label: '文档', value: 'DOC'}
].map(item => (
    <Option key={uuid()} value={item.value}>{item.label}</Option>
));

const examTypes = [
    {label: '单选题', value: 'SINGLE'},
    {label: '多选题', value: 'MULTIPLE'},
    {label: '填空题', value: 'FILL'},
    {label: '判断题', value: 'TOF'}
];

export const examTypeOptions = examTypes.map(item => (
    <Option key={uuid()} value={item.value}>{item.label}</Option>
));

export const EXAM_TYPE_MAPPING = examTypes.reduce((map, type) => {
    map[type.value] = type.label;
    return map;
}, {});

/**
 * @param list 下拉数据
 * @param keyAsValue
 * @param labelName
 */
export const renderOptions = (keyAsValue, labelName) => (list) => list?.map(item =>
    (<Option key={uuid()} value={item[keyAsValue]}>{item[labelName]}</Option>)
);

