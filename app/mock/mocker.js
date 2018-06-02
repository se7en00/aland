const account = require('./account');
const onlineLesson = require('./onlineLessons');

const proxy = Object.assign({}, account, onlineLesson);

module.exports = proxy;
