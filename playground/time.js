var moment = require('moment');

var someTimestamp = moment().valueOf();
console.log(someTimestamp)

var createdAt = 1234;
var date = moment(createdAt);

var date = moment();
console.log(date.format('MMM YYYY'))