import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, NewsCreate} from 'components/news';

@connect(state => ({news: state.news}), mapDispatchToProps)
class NewsAddView extends Component {
    render() {
        return <NewsCreate {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default NewsAddView;
