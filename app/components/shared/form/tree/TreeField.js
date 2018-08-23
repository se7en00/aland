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
    const { api } = this.props;
    Axios.get(api)
      .then(response => {
        const { elements = [] } = response ?.data;
        console.log(this.pareTreeData(elements))
      })
      .catch(error => console.log(error));
  }
  pareTreeData(elements) {
    var result = [], temp;

    for(let i=0,len = elements.lenght;i<len;i++){
      // if(elements[i].childDepartmentUsers){
      //   result[i] = {
      //     title: elements[i].departmentName,
      //     value: elements[i].departmentId,
      //     key: elements[i].departmentId,
      //   }
      // }
      let _obj ={};
      Object.keys(elements[i]).forEach(key=>{
        if(elements[i].departmentName){
          if('departmentName' == key){
            _obj.title = elements[i][key];
          }
          if('departmentId' == key){
            _obj.value = elements[i][key];
            _obj.key = elements[i][key];
          }
        }
        if(elements[i].users){
          
        }
       
      })
    }


      
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
        <TreeSelect {...tProps} />
      </div>
    );
  }
}

export default TreeField;
