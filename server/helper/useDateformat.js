const moment = require('moment');
const months = [
	{
		abbreviation: 'Jan',
		name: 'January',
	},
	{
		abbreviation: 'Feb',
		name: 'February',
	},
	{
		abbreviation: 'Mar',
		name: 'March',
	},
	{
		abbreviation: 'Apr',
		name: 'April',
	},
	{
		abbreviation: 'May',
		name: 'May',
	},
	{
		abbreviation: 'Jun',
		name: 'June',
	},
	{
		abbreviation: 'Jul',
		name: 'July',
	},
	{
		abbreviation: 'Aug',
		name: 'August',
	},
	{
		abbreviation: 'Sep',
		name: 'September',
	},
	{
		abbreviation: 'Oct',
		name: 'October',
	},
	{
		abbreviation: 'Nov',
		name: 'November',
	},
	{
		abbreviation: 'Dec',
		name: 'December',
	},
];

function DateStringMonthYear(date) {
	if (date === null || date === undefined) return '';
	const format = String(moment(date).format('ll')).split(',');
	const _ = format[0].split(' ');
	return `${_[1]} ${_[0]}, ${format[1]}`;
}

function basicFormat(date) {
	if (date === null || date === undefined) return '';
	const _ = String(moment(date).format('L')).split('/');
	return `${_[1]}/${_[0]}/${_[2]}`;
}

function basicDateTimeFormat(date) {
	if (date === null || date === undefined) return '';
	const _ = String(moment(date).format('L')).split('/');
	return `${_[1]}/${_[0]}/${_[2]} ${moment(date).format('h:mm:ss a')}`;
}

function monthByIndex(index) {
	let month = months.find((a, i) => i === index);
	return month ? month.name : 'not Found';
}

module.exports = {
	DateStringMonthYear,
	basicFormat,
	monthByIndex,
	basicDateTimeFormat,
};
