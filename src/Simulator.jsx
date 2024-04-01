import { useState } from "react";
import StudentId from "./features/id_card/StudentId";

export default function Simulator() {
	const [isBoxOpened, setIsIdBoxOpened] = useState(true);
	return (
		<div className="bg w-screen h-screen">
			<StudentId setIsIdBoxOpened={setIsIdBoxOpened} />
		</div>
	);
}
