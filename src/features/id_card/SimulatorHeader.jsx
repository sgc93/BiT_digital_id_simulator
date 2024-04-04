import { IoCloseCircle } from "react-icons/io5";

export default function SimulatorHeader({ handleClose }) {
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
