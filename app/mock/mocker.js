const account = require('./account');
const onlineLesson = require('./onlineLessons');
const onclick = require('./onclick');

const proxy = Object.assign({}, account, onlineLesson, onclick);

module.exports = proxy;
