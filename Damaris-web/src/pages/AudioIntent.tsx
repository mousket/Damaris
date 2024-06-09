import analyzeUserInputForDamarisIntent from "@/Domain/Intent/userIntent";
import AudioRecord from "@/components/shipping/AudioRecord";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { ClipboardType } from "lucide-react";
import { Link } from "react-router-dom";

const AudioIntent = () => {
	// Logic for handling the intent here
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Card className=" bg-white/70">
				<CardHeader>
					<CardTitle>Main menu</CardTitle>
					<CardDescription>Please choose your intent</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Link
						to="/"
						className=" flex items-center space-x-4 rounded-md border p-4"
					>
						<ClipboardType />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium leading-none">Intent Menu</p>
							<p className="text-sm text-muted-foreground">
								Use a form to command the system
							</p>
						</div>
					</Link>
					<div>
						<AudioRecord handleText={analyzeUserInputForDamarisIntent} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AudioIntent;
