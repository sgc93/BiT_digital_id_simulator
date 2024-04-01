import { useState } from "react";
import { IoAlert, IoClose, IoIdCard } from "react-icons/io5";

const rules = [
	"The file name of your picture should be your id number",
	"Do not attempt to re-apply",
	"You should use jpg, png and jpeg image formats",
	"blurred image or image with unseen ears will not be acceptable",
];

export default function IDReq() {
	const [isOpen, setIsOpen] = useState(false);

	return isOpen ? (
		<ReqBox />
	) : (
		<div className="flex items-center gap-3 mr-[-5rem]">
			<span className="text-xl text-stone-400 transition-all duration-300 hover:bg-stone-400 hover:text-stone-800 px-2">
				<IoIdCard />
			</span>
			<span className="glassmorphism-white px-2 p-[2px] rounded-full">
				rules
			</span>
		</div>
	);
}

function ReqBox() {
	return (
		<div className="glassmorphism-white w-full p-2 rounded-xl">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<div className="pb-1 flex items-center justify-between">
						<span className="text-lg font-bold text-blue-950">
							Application Rules
						</span>
						<IoClose className="text-xl rounded-full transition-all duration-300 hover:bg-stone-800 hover:text-stone-100" />
					</div>
					<span className="w-full h-[1px] bg-stone-700"></span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="glassmorphism-bg px-2 py-[2px] rounded-lg font-semibold text-red-600">
						Take caution for the following points while applying for digital id
					</span>
					<div className="flex flex-col  gap-1">
						{rules.map((rule, key) => (
							<div key={key} className="flex items-center gap-2">
								<IoAlert className="text-xl p-[3px] glassmorphism-bg rounded-full" />
								<span className="text-stone-900 glassmorphism-bg rounded-full px-2">
									{rule}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
