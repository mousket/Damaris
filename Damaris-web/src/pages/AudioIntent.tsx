import analyzeUserInputForDamarisIntent from "@/Domain/Intent/userIntent";
import AudioRecord from "@/components/shipping/AudioRecord";

const AudioIntent = () => {
	// Logic for handling the intent here
	return <AudioRecord handleText={analyzeUserInputForDamarisIntent} />;
};

export default AudioIntent;
