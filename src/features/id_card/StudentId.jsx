import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { IoCloseCircle } from "react-icons/io5";
import {
	dateFormatter,
	getRandomLetter,
	readFile,
} from "../../services/helper";

export default function StudentId({ setIsIdBoxOpened }) {
	const [name, setName] = useState("Eleizer ");
	const [dept, setDept] = useState("Software Engineering");
	const [id, setId] = useState("1309999");
	const [letter, setLetter] = useState("R");
	const [img, setImg] = useState("/avatars/female.svg");

	function closeSimulator() {
		setIsIdBoxOpened(false);
	}

	return (
		<div className=" w-1/2 h-3/4 bg-stone-900 rounded-xl flex flex-col">
			<SimulatorHeader handleClose={closeSimulator} />
			<div className="h-[92%] w-full flex flex-col items-center pt-6 gap-10">
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
		</div>
	);
}

function SimulatorHeader({ handleClose }) {
	return (
		<div className=" flex flex-col h-[8%] w-full">
			<div className="flex items-center justify-between px-2 py-[2px]">
				<span className="text-stone-500">
					BSC student digital Id card simulator
				</span>
				<IoCloseCircle
					className="text-red-600 text-xl transition-all duration-300 hover:text-red-400 cursor-pointer"
					onClick={() => handleClose()}
				/>
			</div>
			<span className="w-full h-[1px] bg-stone-700"></span>
		</div>
	);
}

function IdCard({ name, dept, id, letter, img }) {
	return (
		<div className="glassmorphism-white w-[55%] h-[52%] flex items-center justify-center rounded-xl p-[0.7rem]">
			<div className="w-[400px] h-full bg-stone-50 rounded-lg overflow-hidden">
				<IdCardHeader />
				<IdCardBody name={name} dept={dept} id={id} img={img} />
				<BarCode id={id} letter={letter} />
			</div>
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

function IdCardHeader() {
	return (
		<div className="h-[70px] bg-[#0066cc] flex items-center gap-4">
			<img className="h-full" src="/bitLogo.png" alt="bitLogo" />
			<div className="w-full flex flex-col items-center text-stone-50 text-xl">
				<span className="">Bahir Dar Institute of Technology</span>
				<span>Bahir Dar University</span>
			</div>
		</div>
	);
}

function IdCardBody({ name, dept, id, img }) {
	const date = dateFormatter(new Date(), "short")
		.split(",")
		.join(" ")
		.split(" ");
	date.splice(2, 1);
	const issueDate = date.join("-");

	return (
		<div className="w-full h-[122px] flex">
			<div className="w-[122px] h-[122px] flex items-center justify-center">
				<img className="w-full h-full" src={img} alt={name.split(" ")[0]} />
			</div>
			<div className="w-[calc(100%-122px)] h-full flex flex-col">
				<span className="w-full h-[1.3rem] bg-black text-white text-center text-[.8rem]">
					BSC STUDENT ID
				</span>
				<div className="relative w-full h-[calc(100%-1.3rem)]">
					<div className="absolute top-0 left-0 opacity-45 h-full w-full flex items-center justify-center py-1">
						<img src="/bitLogo.png" className="h-full" />
					</div>
					<div className="absolute top-0 left-0 w-full h-full px-2 font-bold flex flex-col">
						<div className="flex items-end gap-1">
							<span>Name:</span>
							<span>{name}</span>
						</div>
						<div className="flex items-end gap-3">
							<span>Dept: </span>
							<span>{dept}</span>
						</div>
						<div className="flex items-end gap-6">
							<span>ID:</span>
							<span>BDU{id}</span>
						</div>
						<div className="flex items-end gap-3">
							<span>Issue Date:</span>
							<span>{issueDate}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function BarCode({ id, letter }) {
	const [value, setValue] = useState(`${id}${letter}`);
	useEffect(() => {
		if (id) {
			if (letter !== "") {
				setValue(`${id}${letter}`);
			} else {
				setValue(`${id}${getRandomLetter()}`);
			}
		}
	}, [id, letter]);

	return (
		<div className="w-full h-[22%] flex items-center justify-center">
			{id ? (
				<Barcode
					format="CODE39"
					value={value}
					height={47}
					width={2.2}
					margin={1}
					displayValue={false}
				/>
			) : (
				<PlaceHolder />
			)}
		</div>
	);
}

function PlaceHolder() {
	return (
		<div className="flex flex-col items-center text-blue-700">
			<span className="font-semibold">
				enter <span className="font-bold text-red-500">Valid</span> Id number
				please
			</span>
			<span className="text-sm ">
				Id should be a numerical string with length &lt; 8
			</span>
		</div>
	);
}
