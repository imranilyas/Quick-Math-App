//! Will add difficult eventually which will be passed in through as params
export const additionArray = (answer) => {
	let x = Math.floor(Math.random() * 4);
	const arr = [];
	for (let i = 0; i < 4; i++) {
		if (i === x) {
			arr.push({ id: answer });
		} else {
			let rng = Math.floor(Math.random() * 20);
			while (
				arr.some((question) => question["id"] === rng) ||
				rng === answer
			) {
				rng = Math.floor(Math.random() * 20);
			}
			arr.push({ id: rng });
		}
	}
	return arr;
};

export const multiplicationArray = (answer) => {
	let x = Math.floor(Math.random() * 4);
	const arr = [];
	for (let i = 0; i < 4; i++) {
		if (i === x) {
			arr.push({ id: answer });
		} else {
			let rng = Math.floor(Math.random() * 84);
			while (
				arr.some((question) => question["id"] === rng) ||
				rng === answer
			) {
				rng = Math.floor(Math.random() * 84);
			}
			arr.push({ id: rng });
		}
	}
	return arr;
};

export const subtractionArray = (answer) => {
	let x = Math.floor(Math.random() * 4);
	const arr = [];
	const factor = answer < 0 ? -1 : 1;
	for (let i = 0; i < 4; i++) {
		if (i === x) {
			arr.push({ id: answer });
		} else {
			let rng = Math.floor(Math.random() * 20) * factor;
			while (
				arr.some((question) => question["id"] === rng) ||
				rng === answer
			) {
				rng = Math.floor(Math.random() * 20) * factor;
			}
			arr.push({ id: rng });
		}
	}
	return arr;
};

export const divisionArray = (answer) => {
	let x = Math.floor(Math.random() * 4);
	const arr = [];
	for (let i = 0; i < 4; i++) {
		if (i === x) {
			arr.push({ id: answer });
		} else {
			let rng = Math.floor(Math.random() * answer * 2 + 1);
			while (
				arr.some((question) => question["id"] === rng) ||
				rng === answer
			) {
				rng = Math.floor(Math.random() * answer * 2 + 1);
			}
			arr.push({ id: rng });
		}
	}
	return arr;
};
