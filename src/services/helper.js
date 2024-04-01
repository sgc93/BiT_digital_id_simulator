export function dateFormatter(date, mLength) {
	const toDate = new Date(date);
	const formatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: mLength ? "short" : "long",
		day: "numeric",
	});

	return formatter.format(toDate);
}

// random  a-z uppercase letter provider
export function getRandomLetter() {
	const i = Math.random();
	const letter = letters[Math.round(i * letters.length - 1)];
	return letter;
}

// file reading (img file)
export function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => resolve(event.target.result);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
}
