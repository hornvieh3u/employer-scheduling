// import React from 'react';

const useNumberformat = () => {
	function useComma(num) {
		let number = String(num).split('.');
		let beforeDesimel = String(number[0]).split('');
		let afterDesimel = number[1];

		function comma(arr) {
			if (!arr) {
				return '';
			}
			if (arr.length < 4) return arr.join('');
			let newArr = [];
			for (let i = 0; i < arr.length; i++) {
				if (arr.length === 4) {
					if (i === 1) {
						newArr.push(',');
					}
				}
				if (arr.length === 5) {
					if (i === 2) {
						newArr.push(',');
					}
				}

				if (arr.length === 6) {
					if (i === 1 || i === 3) {
						newArr.push(',');
					}
				}
				if (arr.length === 7) {
					if (i === 2 || i === 4) {
						newArr.push(',');
					}
				}
				if (arr.length === 8) {
					if (i === 1 || i === 3 || i === 5) {
						newArr.push(',');
					}
				}
				newArr.push(arr[i]);
			}
			return newArr.join('');
		}

		beforeDesimel = comma(beforeDesimel);
		afterDesimel = afterDesimel ? `.${afterDesimel}` : '';

		if (String(beforeDesimel).startsWith('-,')) {
			beforeDesimel = String(beforeDesimel).replace('-,', '-');
		}

		return `${beforeDesimel}${afterDesimel}`;
	}

	return {
		useComma,
	};
};

export default useNumberformat;
