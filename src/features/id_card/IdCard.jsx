import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { dateFormatter, getRandomLetter } from "../../services/helper";

export default function IdCard({ name, dept, id, letter, img }) {
	return (
		<div
			id="idCard"
			className="glassmorphism-white w-[55%] h-[270px] flex items-center justify-center rounded-xl p-[0.7rem]"
		>
			<div className="w-[400px] h-full bg-stone-50 rounded-lg overflow-hidden">
				<IdCardHeader />
				<IdCardBody name={name} dept={dept} id={id} img={img} />
				<BarCode id={id} letter={letter} />
			</div>
		</div>
	);
}

function IdCardHeader() {
	return (
		<div className="h-[70px] bg-[#0066cc] flex items-center gap-4">
			<img className="h-full" src="/bitLogo.png" alt="bitLogo" />
			<div className="w-full h-[70px] flex flex-col items-center justify-center text-stone-50 text-xl">
				<span className="">Bahir Dar Institute of Technology</span>
				<span>Bahir Dar University</span>
			</div>
		</div>
	);
}

function BiTStamp() {
	return (
		<div className="absolute -bottom-[0.4rem] -right-[2.65rem] h-[57%] w-full flex items-center justify-center py-1">
			<img src="/stamp.png" className="h-full" />
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
			<div className="relative w-[122px] h-[122px] flex items-center justify-center">
				<img className="w-full h-full" src={img} alt={name.split(" ")[0]} />
				<BiTStamp />
			</div>
			<div className="w-[calc(100%-122px)] h-full flex flex-col">
				<span className="w-full h-[20.8px] bg-black text-white text-center text-[.8rem]">
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
