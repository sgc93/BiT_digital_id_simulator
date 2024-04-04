import { useState } from "react";
import { readFile } from "../../services/helper";
import Downloader from "./Downloader";
import IdCard from "./IdCard";
import SimulatorHeader from "./SimulatorHeader";

export default function StudentId({ simulate }) {
	const [name, setName] = useState("Name FName GFName ");
	const [dept, setDept] = useState("Associative Engineering");
	const [id, setId] = useState("1309999");
	const [letter, setLetter] = useState("R");
	const [img, setImg] = useState("/avatars/female.svg");

	return (
		<div className=" w-1/2 h-[85%] bg-stone-900 rounded-xl flex flex-col">
			<SimulatorHeader simulate={simulate} />
			<div className="h-full w-full flex flex-col items-center pt-6 gap-10">
				<IdCard name={name} dept={dept} id={id} img={img} letter={letter} />
				<DataField
					name={name}
					setName={setName}
					dept={dept}
					setDept={setDept}
					id={id}
					setId={setId}
					letter={letter}
					setLetter={setLetter}
					setImg={setImg}
				/>
			</div>
			<Downloader name={name} />
		</div>
	);
}

function DataField({
	name,
	setName,
	dept,
	setDept,
	id,
	setId,
	letter,
	setLetter,
	setImg,
}) {
	function isValid(num) {
		const stringId = num.toString();
		return stringId.length < 8;
	}

	function isNegative(num) {
		return num < 0;
	}

	function handleChangeInId(e) {
		if (isNegative(e.target.value) || !isValid(e.target.value)) {
			setId(0);
		} else {
			setId(e.target.value);
		}
	}

	function enterLetter(e) {
		const letValue = e.target.value;
		if (letValue.length <= 1) {
			setLetter(letValue.toUpperCase());
		}
	}

	return (
		<div className="flex flex-col gap-3">
			<span className="text-stone-400 text-center">
				Import the following data
			</span>
			<div className="text-stone-400 flex flex-col gap-2">
				<div className="field_box">
					<span>Full Name:</span>
					<input
						type="text"
						placeholder="full name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="field_box">
					<span>Department:</span>
					<input
						type="text"
						placeholder="department"
						value={dept}
						onChange={(e) => setDept(e.target.value)}
					/>
				</div>
				<div className="field_box">
					<span>ID No:</span>
					<input
						type="number"
						placeholder="id number"
						value={id}
						onChange={handleChangeInId}
					/>
				</div>
				<div className="field_box flex justify-between w-81">
					<ImageLoader setImg={setImg} />
					{id.length > 1 && (
						<input
							type="text"
							placeholder="letter"
							className="w-16"
							value={letter}
							onChange={enterLetter}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

function ImageLoader({ setImg }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [imgName, setImgName] = useState("");

	async function handleUploading(e) {
		const file = e.target.files[0];
		try {
			setIsLoading(true);
			const url = await readFile(file);
			setImg(url);
			setImgName(file.name);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-full bg-stone-200 rounded-lg flex overflow-hidden transition-all duration-300 hover:bg-blue-300">
			<label
				htmlFor="imgInput"
				className="w-full h-full cursor-pointer py-1 text-center text-stone-800 font-semibold "
			>
				{isLoading ? (
					"uploading..."
				) : error !== "" ? (
					<span>error</span>
				) : imgName !== "" ? (
					imgName
				) : (
					"upload your image"
				)}
			</label>
			<input
				type="file"
				accept="image/.png, image/.jpg, image/jpeg"
				onChange={handleUploading}
				id="imgInput"
				className="absolute z-[-1]"
			/>
		</div>
	);
}
