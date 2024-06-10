import {getAnswersFromQNA} from "@/Domain/QnA/qna";
import AudioRecord from "@/components/shipping/AudioRecord";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const AudioShipping = () => {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Card className=" bg-white/70">
				<CardHeader>
					<CardTitle>Shipping Page </CardTitle>
					<CardDescription>
						Use vocal command to create your shipping
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div>
						<AudioRecord handleText={getAnswersFromQNA} />;
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default AudioShipping;
