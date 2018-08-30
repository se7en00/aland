import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Menu, Dropdown, Icon } from 'antd';
import PropTypes from 'prop-types';
import { DATE_FORMAT, getLinkByName, PATHNAME, COURSE_STATUS_MAPPING } from 'constants';
import { rebuildDataWithKey, paginationSetting } from 'utils';

class OnlineLessonsListTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object,
        searchParams: PropTypes.object,
        secretLevels: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.elements = [];
        this.pagination = {
            ...paginationSetting,
            onChange: this.handelPageChange
        };
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 40
        }, {
            title: '课程名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            width:80,
            render: (text, record) => COURSE_STATUS_MAPPING[record.status]
        }, {
            title: '课程讲师',
            align: 'center',
            dataIndex: 'lecturerName',
            width:120,
        }, {
            title: '保密权限',
            align: 'center',
            dataIndex: 'secretLevel',
            width:80,
        }, {
            title: '创建人',
            align: 'center',
            dataIndex: 'createUserName',
            width:120,
        }, {
            title: '发布时间',
            align: 'center',
            dataIndex: 'createdAt',
            width:170,
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
           width:320,
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.onEdit(record)} ghost>详情/编辑</Button>
                    {record.status === 'ISSUED' && <Button size="small" onClick={() => this.unShelveCourse(record)} type="primary" ghost>下架</Button>}
                    {record.status !== 'ISSUED' && <Button size="small" onClick={() => this.shelveCourse(record)} type="primary" ghost>上架</Button>}
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                    <Dropdown overlay={this.buttonMenu(record.id)}>
                        <Button size="small" type="primary" ghost>保密设置<Icon type="down"/></Button>
                    </Dropdown>
                </div>
            )
        }];
    }

    setSecretLevel = ({key}) => {
        if (key) {
            const {
                actions: {setSecretLevel, getOnlineLessonsList},
                dataSource: {paging: {size, page}},
                searchParams
            } = this.props;
            const splitResults = key.split('-');
            setSecretLevel(splitResults[0], splitResults[1])
                .then(() => {
                    message.success(`保密（${splitResults[1]}）设置成功！`);
                    getOnlineLessonsList(Object.assign({size, page}, searchParams));
                })
                .catch(error => {
                    if (error?.errorCode === 'course_not_found') {
                        message.error(error?.errorMessage);
                    } else {
                        message.error(`保密（${splitResults[1]}）设置失败！`);
                    }
                });
        }
    }


    buttonMenu = (courseId) => {
        const {secretLevels} = this.props;
        if (secretLevels && secretLevels.length > 0) {
            return (
                <Menu onClick={this.setSecretLevel}>
                    {secretLevels.map(secret => <Menu.Item key={`${courseId}-${secret.code}`}>{secret.name}</Menu.Item>)}
                </Menu>
            );
        }
    }

    onEdit = (lesson) => {
        const {getCourseDetails, push} = this.props.actions;
        getCourseDetails(lesson.id)
            .then(() => {
                push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/${lesson.id}/details`);
            })
            .catch(error => console.log(error));
    };

    onDelete = (lesson) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {removeLesson, getOnlineLessonsList},
            searchParams
        } = this.props;
        removeLesson(lesson.id)
            .then(() => {
                message.success(`成功删除课程：${lesson.name}！`);
                getOnlineLessonsList(Object.assign({size, page}, searchParams));
            })
            .catch(error => {
                if (error?.errorCode === 'course_not_found') {
                    message.error(error?.errorMessage);
                } else {
                    message.error(`删除课程：${lesson.name}失败！`);
                }
            });
    }

    shelveCourse = (lesson) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {shelveCourse, getOnlineLessonsList},
            searchParams
        } = this.props;
        shelveCourse(lesson.id)
            .then(() => {
                message.success(`成功上架课程：${lesson.name}！`);
                getOnlineLessonsList(Object.assign({size, page}, searchParams));
            })
            .catch(error => {
                if (error?.errorCode === 'course_not_found') {
                    message.error(error?.errorMessage);
                } else {
                    message.error(`上架课程：${lesson.name}失败！`);
                }
            });
    };

    unShelveCourse = (lesson) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {unShelveCourse, getOnlineLessonsList},
            searchParams
        } = this.props;
        unShelveCourse(lesson.id)
            .then(() => {
                message.success(`成功下架课程：${lesson.name}！`);
                getOnlineLessonsList(Object.assign({size, page}, searchParams));
            })
            .catch(error => {
                if (error?.errorCode === 'course_not_found') {
                    message.error(error?.errorMessage);
                } else {
                    message.error(`下架课程：${lesson.name}失败！`);
                }
            });
    }

    handelPageChange = (page, pageSize) => {
        const { getOnlineLessonsList } = this.props.actions;
        const { searchParams } = this.props;
        getOnlineLessonsList(Object.assign({pageSize, page}, searchParams));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0 } = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm"
                bordered
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={this.pagination}
            />
        );
    }
}

export default OnlineLessonsListTable;
