import transcribeAudioFromMicrophone from "@/Domain/Speech/audioToText";
import { UserRepliesContext } from "@/main";
import { useState, useContext, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

enum AiState {
	IS_RECORDING, IS_SPEAKING, IS_LOADING, NONE
}

const AudioRecord = ({
	handleText,
	handlePrompt
}: {
	handleText?: (text: string, navigate: NavigateFunction) => Promise<unknown>,
	handlePrompt?: { prompt: string, handleResponse: (text: string) => Promise<boolean>} | null
}) => {
	const userRepliesContent = useContext(UserRepliesContext)
	const [isRecording, setIsRecording] = useState(false);
	const [text, setText] = useState("");
	const [aiState, setAiState] = useState<AiState>(AiState.NONE)
	const [speech, setSpeech] = useState<string | null> (null);
	const navigate = useNavigate();

	// TODO: handle prompts
	useEffect(() => {
		if(handlePrompt) {
			setAiState(AiState.IS_LOADING)
			// Rephrase prompt and play for user
			// text to speech
			// setSpeech
		}
	}, [handlePrompt])

	const record = async () => {
		setIsRecording(true);
		const recognizedText = await transcribeAudioFromMicrophone();
		setText(recognizedText);
		if(recognizedText != "No speech detected.") {
			userRepliesContent?.handleAddUserReply(recognizedText)
		}
		setIsRecording(false);
		if(handleText) await handleText(text, navigate);
	};

	return (
		<div className="h-full min-w-[500px] flex flex-col justify-end content-center text-center py-8">
			<div className="h-full w-full flex items-center justify-center">
				{" "}
				<button
					onClick={record}
					className={`${isRecording ? "animate-spin" : ""}`}
					disabled={aiState === AiState.IS_LOADING || aiState === AiState.IS_SPEAKING }
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
