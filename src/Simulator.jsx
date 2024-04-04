import { useState } from "react";
import StudentId from "./features/id_card/StudentId";
import IDReq from "./features/requirement/IDReq";

export default function Simulator() {
	const [isBoxOpened, setIsIdBoxOpened] = useState(false);
	function simulate(shouldSimulate) {
		setIsIdBoxOpened(shouldSimulate);
	}
	return (
		<div className="bg w-screen h-screen">
			{isBoxOpened && (
				<div className="absolute left-0 top-0 z-30 w-screen h-screen backdrop-blur-[3px] flex items-center justify-center">
					<StudentId simulate={simulate} />
				</div>
			)}
			<IDReq simulate={simulate} />
		</div>
	);
}
