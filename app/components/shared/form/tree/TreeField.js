import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { Axios, debounce } from 'utils';
import remapReduxFormProps from '../RemapReduxFormProps';
const TreeNode = TreeSelect.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
@remapReduxFormProps
class TreeField extends Component {
  constructor(props) {
    super(props);
    this.treeData =[];
    this.pareTreeData = this.pareTreeData.bind(this)
    this.state = {
      value: undefined,
      treeData: [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        }],
      }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [{
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        }, {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        }, {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        }],
      }]
    }
  }
  static propTypes = {
    className: PropTypes.string,
    api: PropTypes.string,
  }
  componentDidMount() {
    this.dataAction("");
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }
  dataAction() {
    let self = this;
    const { api } = this.props;
    Axios.get(api)
      .then(response => {
        const elements = response.data || [];
       let result = this.pareTreeData(elements)
        this.setState({
          treeData:result
        })
      })
      .catch(error => console.log(error));
  }
  pareTreeData(elements) {
    var result = [], temp;
 

    if(!Array.isArray(elements) || elements.length<=0) return '';
    elements.forEach((item, i)=>{
      let _children = {
        title:item.departmentName,
        value:item.departmentId,
        key:item.departmentId
      }
      if(Array.isArray(item.childDepartmentUsers) && item.childDepartmentUsers.length>0&& !item.users){
        _children.children = this.pareTreeData(item.childDepartmentUsers);
      }
      if(Array.isArray(item.users) && item.users.length>0 &&Array.isArray(item.childDepartmentUsers) && item.childDepartmentUsers.length>0 ){
        let __children = [];
        item.users.forEach(_item=>{
          
          __children.push({
            title:_item.name,
            value:_item.id,
            key:_item.id
          })

        })
        _children.children =__children.concat( this.pareTreeData(item.childDepartmentUsers));
      }
      if(Array.isArray(item.users) && item.users.length>0 && !item.childDepartmentUsers){
        _children.children = [];
        item.users.forEach(_item=>{
          
          _children.children.push({
            title:_item.name,
            value:_item.id,
            key:_item.id
          })

        })
      }
      result.push(_children)
    })
    
    return result;
  }
  render() {
    const {
      input,
      children,
      placeholder,
      defaultValue,
      meta: { touched, error, warning },
      className,
      filterOption,
      onSelect,
      onDeselect,
      showSearch,
      allowClear,
      onSearch,
      onBlur,
      fetching,
      labelInValue,
      mode
    } = this.props;
    const tProps = {
      treeData: this.state.treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: placeholder,

      style: {
        width: 300,
      },
    };
    return (
      <div className={className}>
      <input {...input} type="hidden" value={this.state.value}/>
        <TreeSelect {...tProps} />
      </div>
    );
  }
}

export default TreeField;
