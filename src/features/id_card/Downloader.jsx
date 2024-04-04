import { useEffect, useState } from "react";
import { downloadId } from "../../services/helper";

const btn_style =
	"text-slate-100 font-semibold px-2 py-[2px] rounded-lg transition-all duration-300";

export default function Downloader({ name }) {
	const [status, setStatus] = useState("");
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setStatus("");
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, [status]);

	async function handleDownLoading(fileType) {
		try {
			const fileName = name.split(" ").join("_");
			const statusFrom = await downloadId(fileType, fileName);
			setStatus(statusFrom);
		} catch (error) {
			setStatus(error);
		}
	}
	return (
		<div className="w-full h-fit p-4 flex items-center justify-end">
			{status ? (
				<span
					className={`${
						status === "something went wrong!" ? "bg-red-600" : "bg-green-600"
					} ${btn_style}`}
				>
					{status}
				</span>
			) : (
				<div className="flex items-center gap-2">
					<button
						className={`bg-slate-500 hover:text-slate-900 hover:bg-slate-400 ${btn_style}`}
						onClick={() => handleDownLoading("pdf")}
					>
						<span>download as pdf</span>
					</button>
					<button
						className={`bg-slate-500 hover:text-slate-900 hover:bg-slate-400 ${btn_style}`}
						onClick={() => handleDownLoading("image")}
					>
						<span>download as jpg</span>
					</button>
				</div>
			)}
		</div>
	);
}
