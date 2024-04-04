import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { letters } from "../data/constants";

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

export function downloadId(fileType, fileName) {
	return new Promise((resolve, reject) => {
		const idDiv = document.getElementById("idCard");
		html2canvas(idDiv)
			.then((canvas) => {
				const url = canvas.toDataURL("image/jpg");
				if (fileType === "image") {
					const a = document.createElement("a");
					a.setAttribute("href", url);
					a.setAttribute("download", `${fileName}.jpg`);
					a.click();
					a.remove();
				} else {
					const pdf = new jsPDF();
					pdf.addImage(url, "JPG", 35, 20);
					pdf.save(`${fileName}.pdf`);
				}
				resolve("Id downloaded successfully!");
			})
			.catch(() => {
				reject("something went wrong!");
			});
	});
}
