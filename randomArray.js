export const randomArray = (answer) => {
	let x = Math.floor(Math.random() * 4);
	const arr = [];
	for (let i = 0; i < 4; i++) {
		if (i === x) {
			arr.push({ id: answer, chosen: false });
		} else {
			let rng = Math.floor(Math.random() * answer + 10);
			while (
				arr.some((question) => question["id"] === rng) ||
				rng === answer
			) {
				rng = Math.floor(Math.random() * answer + 10);
			}
			arr.push({ id: rng, chosen: false });
		}
	}
	return arr;
};
