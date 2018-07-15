import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, NewsDetail} from 'components/news';

@connect(state => ({news: state.news}), mapDispatchToProps)
class NewsDetailView extends Component {
    render() {
        return <NewsDetail {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default NewsDetailView;
