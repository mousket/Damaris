import transcribeAudioFromMicrophone from "@/Domain/Speech/audioToText";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const AudioRecord = ({
	handleText,
}: {
	handleText: (text: string, navigate: NavigateFunction) => Promise<any>;
}) => {
	const [isRecording, setIsRecording] = useState(false);
	const [text, setText] = useState("");
	const navigate = useNavigate();

	const record = async () => {
		setIsRecording(true);
		const recognizedText = await transcribeAudioFromMicrophone();
		setText(recognizedText);
		setIsRecording(false);
		await handleText(text, navigate);
	};

	return (
		<div className="h-full min-w-[500px] flex flex-col justify-end content-center text-center py-8">
			<div className="h-full w-full flex items-center justify-center">
				{" "}
				<button
					onClick={record}
					className={`${isRecording ? "animate-spin" : ""}`}
				>
					<img src="src/assets/interaction.png" />
				</button>
			</div>

			<div className="p-4 h-48 text-lg rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500">
				{text}
			</div>
		</div>
	);
};
export default AudioRecord;
