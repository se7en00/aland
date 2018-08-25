import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { DATE_FORMAT } from 'constants';
import { Axios, paginationSetting } from 'utils/index';
import { BASE_URL } from 'constants/index';
class OnlineMessageArea extends Component {

    // static propTypes = {
    //     // actions: PropTypes.objectOf(PropTypes.func),
    //     dataSource: PropTypes.object
    // };

    constructor(props) {
        super(props);
        this.state = {
            elements : []
        }
        this.showTable = this.showTable.bind(this)
        this.page = 1;
        this.size = 10;
        this.elements = [];
        this.pagination = {
            onChange: this.handelPageChange
        };
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '留言人',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '留言内容',
            align: 'center',
            dataIndex: 'content'
        }, {
            title: '留言对象',
            align: 'center',
            dataIndex: 'person'

        }, {
            title: '留言时间',
            align: 'center',
            dataIndex: 'time',
            render: (text, record) => moment(parseInt(record.time.split(',')[0])).format(DATE_FORMAT)+'-'+(moment(parseInt(record.time.split(',')[1])).format(DATE_FORMAT))
        },{
            title: '操作',
            align: 'center',
            key: 'action',
            render: (text, record) => (
                <span>
                  <a href="javascript:;">留言人禁言</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">不展示</a>
                </span>
              ),

        }];
    }

    handelPageChange() {

    }
    showTable(lid, page, size){
        Axios.get(`/api/courses/${lid}/comments`,{params:{
            page: page,
            size: size
        }}).then(data => {
            console.log(data)
            if (data.data.elements.length === 0){
                this.elements = [];
            }
            if (data.data.elements.length > 0){
                let i = 0;
                data.data.elements.forEach(item => {
                    i++;
                    this.elements.push({
                        key: i,
                        index: i,
                        name: item.trainingData ? item.trainingData.title : "",
                        type: item.trainingData ? item.trainingData.trainType : "",
                        teacher: item.trainingData ? item.trainingData.manager : "",
                        time: item.trainingData ?(( item.trainingData.startDate || '')+','+( item.trainingData.endDate || "") ): ",",
                    });
                });
            }
         
            this.setState({
                elements: this.elements,
                total: data.data.paging.total
            });
        });
    }
    componentDidMount(){
       // const {userId} = this.props;
        if (/details$/g.test(location.pathname)) {
            const courseId = location.pathname.match(/(\w)+(?=\/details$)/g)[0];
            if (courseId) {

                this.courseId = courseId;
                this.showTable(courseId, this.page, this.size);
            }
        }
       
    }
    render() {
      //  const {userId} = this.props;
        let self = this;
        return (
            <Table
                className="u-pull-down-sm"
                bordered
                size="middle"
                dataSource={this.state.elements}
                columns={this.columns}
                pagination={{
                    total: this.state.total,
                    pageSize: this.size,
                    onChange(current){
                        self.showTable(self.courseId, current, self.size);
                    }
                }}
            />);
    }
}

OnlineMessageArea.propTypes = {
    // associations: PropTypes.object,
   // lid: PropTypes.string
};
export default OnlineMessageArea;
