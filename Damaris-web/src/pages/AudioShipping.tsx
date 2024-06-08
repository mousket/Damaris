import getAnswersFromUserInput from "@/Domain/QnA/qna";
import AudioRecord from "@/components/shipping/AudioRecord";

const AudioShipping = () => {
	return <AudioRecord handleText={getAnswersFromUserInput} />;
};
export default AudioShipping;
