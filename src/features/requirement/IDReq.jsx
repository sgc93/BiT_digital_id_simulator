import { IoAlert } from "react-icons/io5";

const rules = [
	"The file name of your picture should be your id number",
	"Do not attempt to re-apply",
	"You should use jpg, png and jpeg image formats",
	"Blurred image or image with unseen ears will not be acceptable",
];

export default function IDReq({ simulate }) {
	return (
		<div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center">
			<ReqBox simulate={simulate} />
			<div className="h-full w-1/2 flex items-center justify-center bg p-10">
				<div className="glassmorphism-white p-4 rounded-xl">
					<img
						src="Name_FName_GFName_.jpg"
						alt="smple_id"
						className="rounded-xl"
					/>
				</div>
			</div>
		</div>
	);
}

function ReqBox({ simulate }) {
	return (
		<div className="reverse_bg flex flex-col justify-between border-2 border-[var(--color-slight-white)] w-1/2 h-1/2 p-2 rounded-xl m-10">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<div className="pb-1 flex items-center justify-between">
						<span className="text-lg font-bold text-slate-300">
							Application Rules
						</span>
					</div>
					<span className="w-full h-[1px] bg-[var(--color-slight-white)]"></span>
				</div>
				<div className="flex flex-col items-center pt-10 gap-2">
					<span className="glassmorphism-bg px-2 py-[2px] rounded-lg font-semibold text-red-600">
						Take caution for the following points while applying for digital id
					</span>
					<div className="flex flex-col  gap-2">
						{rules.map((rule, key) => (
							<div key={key} className="flex items-center gap-2">
								<IoAlert className="text-2xl text-slate-400 p-[3px] rounded-full" />
								<span className="text-slate-300 text-xl bg rounded-xl py-1 px-2">
									{rule}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-full h-10 flex items-center justify-end">
				<button
					className="glassmorphism-white px-2 py-[2px]  rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-red-600 hover:text-slate-50"
					onClick={() => simulate(true)}
				>
					start simulating
				</button>
			</div>
		</div>
	);
}
