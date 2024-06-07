import { useState } from "react";

const AudioRecord = () => {
	const [isRecording, setIsRecording] = useState(false);

	return (
		<div className="h-full flex flex-col justify-end content-center text-center py-8">
			<div className="h-full w-full flex items-center justify-center">
				{" "}
				<button
					onClick={() => setIsRecording(a => !a)}
					className={`${isRecording ? "animate-spin" : ""}`}
				>
					<img src="src/assets/interaction.png" />
				</button>
			</div>

			<div className="mx-0 sm:mx-16 p-4 h-48 text-lg rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500">
				The text ought to be there
			</div>
		</div>
	);
};
export default AudioRecord;
