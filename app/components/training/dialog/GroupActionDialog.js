import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, submit, Form, Field, SubmissionError, clearSubmitErrors } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, message} from 'antd';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import extendStyle from 'layout/main/extend.scss';
import validate from './validate';
import $ from  'jquery'
const mapStateToProp = (state) => {
    if (R.isEmpty(state.trainings) || !state.trainings?.trainingDetails) return null;
    const {id: trainingId} = state.trainings.trainingDetails;
    return {
        trainingId,
        trainings:state.trainings
    };
};
let groupid = 2;
@connect(mapStateToProp)
@reduxForm({form: DIALOG.GROUP_ACTION, enableReinitialize: true,validate})
class GroupActionDialog extends Component {
    static dialogName = DIALOG.GROUP_ACTION;
    
    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.GROUP_ACTION));
        this.props.dispatch(reset(DIALOG.GROUP_ACTION));
        this.props.hideDialog(DIALOG.GROUP_ACTION)();
    }
    constructor(props) {
        super(props);
        this.state={
           key:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        }
        this.addGroupAction = this.addGroupAction.bind(this);
     }
    resetTransferDefault(){

    }
    componentDidMount(){
        console.log(this.props.trainings)
        $(document).on("click", "#add", function() {
            if (!$("#select1 option").is(":selected")) {
            alert("请选择移动的选项");
            } else {
            $("#select1 option:selected").appendTo(".targetSelect");
            }
        });
        //移到左边
        $(document).on("click", "#remove", function() {
            if (!$(".targetSelect option").is(":selected")) {
            alert("请选择移动的选项");
            } else {
            $(".targetSelect option:selected").appendTo("#select1");
            }
        });
    }
    addGroupAction(){
        // groupid++;
       
        // this.setState({
        //     key:this.state.key.push(groupid)
        // })
    }
    render() {
        const {submitting, handleSubmit, width, dispatch, error,visible,trainings} = this.props;
        let _elements = [];
        let paging = trainings.users ?trainings.users.paging : {};
        console.log(users)
        trainings.users && users.elements.length > 0 && trainings.users.elements.forEach(item=>{
            _elements.push(
                {
                    id:item.userData.id,
                    name:item.userData.name,
                }
            ) 
        })
        return (
            <Modal
                title="分组"
                width={800}
                visible={visible}
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
               
               <div>
        <div className={extendStyle.select}>
            <div className={extendStyle.selectitem}>
                <select multiple="multiple" id="select1">
                { 
                _elements.length>0 && _elements.map((item,i)=>(
                    <option value={item.id} key={i}>{item.name}</option>
                ))
            }
                </select>
            </div>
            <div className={extendStyle.groupwrap}  id="groupWrap">
            {
            this.state.key.map((item,i) => (
                <div className={extendStyle.grouplist} key={i}>
                    <div className={extendStyle.btnitem}>
                        <p><span class="add">右移</span></p>
                        <p><span class="remove">左移</span></p>
                    
                    </div>
                    <div className={extendStyle.selectitem}>
                        <div className={extendStyle.transfertitle}>
                        <span>分组{item}</span>
                        </div>
                        <select multiple="multiple" className="targetSelect" style={{height:'150px'}}></select>
                    </div>
             </div>
            ))
            }
               
           
            </div>



         


        </div>
       
        <div>
            
            {/* <div className={extendStyle.transferbtn}>
                <Button type="primary" onClick={this.addGroupAction}>添加分组</Button>
            </div> */}
        </div>
    </div>
            </Modal>
        );
    }
}

GroupActionDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    trainingId: PropTypes.string,
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    //redux-form 表单有验证错误为true, 相反为false
};

export default GroupActionDialog;
