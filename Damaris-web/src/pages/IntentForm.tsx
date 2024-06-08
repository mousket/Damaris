import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";

const IntentForm = () => {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Card className=" bg-white/70">
				<CardHeader>
					<CardTitle>Main menu</CardTitle>
					<CardDescription>Please choose your intent</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Link
						to="/audio"
						className=" flex items-center space-x-4 rounded-md border p-4"
					>
						<Mic />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium leading-none">
								Use Voice Interaction
							</p>
							<p className="text-sm text-muted-foreground">
								Use your voice directly to command the system
							</p>
						</div>
					</Link>
					<div>
						<Link
							to="/shipform"
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">Shipping</p>
								<p className="text-sm text-muted-foreground">
									New shipping command
								</p>
							</div>
						</Link>
						<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">Tracking</p>
								<p className="text-sm text-muted-foreground">
									Track your package
								</p>
							</div>
						</div>
						<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									Arrange delivery
								</p>
								<p className="text-sm text-muted-foreground">
									Arrange the delivery of your package
								</p>
							</div>
						</div>
						<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									Get shipping information
								</p>
								<p className="text-sm text-muted-foreground">
									Get information from your shipping command
								</p>
							</div>
						</div>
						<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									Get shipping label
								</p>
								<p className="text-sm text-muted-foreground">
									Get a label for your shipping command
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default IntentForm;
