import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { BASE_URL, PATHNAME, getLinkByName } from 'constants';

class LecturersListTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
        searchParams: PropTypes.object,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };
    parseString(str,b){

    //    return str && str.replace(/<[^>]*>/g,'')
        let _str = str? str.replace(/<[^>]*>/g,''):''
        if(b) return _str;
        if(!_str){
            return ''
        }else{
            return this.cutstr(_str,50)
        }
    }
     GetLength = function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };

     cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        console.log(str)
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < len) {
            return str;
        }
    }
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
            width: 70
        }, {
            title: '图片',
            align: 'center',
            dataIndex: 'avatarUrl',
            width: 200,
            render: (text, record) => {
                const domain = new URL(BASE_URL).origin;
                const imgUrl = `${domain}/uploads${record.avatarUrl}`;
                return (
                    <div style={{maxWidth: '100px', margin: '0 auto'}}>
                        <img src={imgUrl} style={{ width: '100px', height: '100px' }} alt="img"/>
                    </div>
                );
            }
        }, {
            title: '姓名',
            align: 'center',
            dataIndex: 'name',
            width:170,
        }, {
            title: '类别',
            align: 'center',
            dataIndex: 'type',
            width:170,
        }, {
            title: '简介',
            align: 'center',
            dataIndex: 'introduce',
            width: 700,
            render: (text, record) => (
                /*eslint-disable-next-line*/
                // <p dangerouslySetInnerHTML={{__html: record.introduce}}/>
                <Tooltip title={this.parseString(record.introduce,true)}>
                <p>{this.parseString(record.introduce)}</p>
                </Tooltip>
            )
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            width:200,
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.redirect(record.id)} ghost>详情/编辑</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    handelPageChange = (page, pageSize) => {
        const { getLecturersList } = this.props.actions;
        getLecturersList(pageSize, page);
        const { searchParams } = this.props;
        getLecturersList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (lecture) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteLecturer, getLecturersList}
        } = this.props;
        deleteLecturer(lecture.id).then(() => {
            message.success(`成功删除素材：${lecture.name}！`);
            getLecturersList(size, page);
        }).catch(error => {
            message.error(`删除素材：${lecture.name}失败！`);
        });
    }

    redirect = (id) => {
        const { push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.MASTER)}/${id}/detail`);
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
            />);
    }
}

export default LecturersListTable;
