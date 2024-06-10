import {getAnswersFromQNA} from "@/Domain/QnA/qna";
import AudioRecord from "@/components/shipping/AudioRecord";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import RateScheme from "@/Schemes/RateScheme";

interface HandlePrompt {
	prompt: string,
	handleResponse?: (text: string) => boolean
}

const AudioShipping = () => {
	const [handlePrompt, setHandlePrompt] = useState<HandlePrompt | null>(null);
	const [modelIdx, setModelIdx] = useState<number>(0);
	const rateScheme = new RateScheme(
		{
			parcel: {
				length: undefined,
				width: undefined,
				dimUnit: undefined,
				weight: undefined,
				height: undefined,
				weightUnit: undefined,
			},
			parcelType: undefined,
			fromAddress: {
				residential: undefined,
				phone: undefined,
				countryCode: undefined,
				postalCode: undefined,
				cityTown: undefined,
				name: undefined,
				addressLine1: undefined,
				stateProvince: undefined,
				addressLine2: undefined,
				company: undefined,
				addressLine3: undefined,
				email: undefined,
			},
			dateOfShipment: undefined,
			serviceId: undefined,
			toAddress: {
				residential: undefined,
				phone: undefined,
				countryCode: undefined,
				postalCode: undefined,
				cityTown: undefined,
				name: undefined,
				addressLine1: undefined,
				stateProvince: undefined,
				addressLine2: undefined,
				company: undefined,
				addressLine3: undefined,
				email: undefined,
			},
			carrierAccounts: [],
			parcelId: undefined,
		}
	);

	useEffect(() => {
		setHandlePrompt({
			prompt: rateScheme.models[1].hint,
			handleResponse: (text: string) => {
				// extract entities
				return true
			}
		})
		rateScheme.models[1]
	}, []);
	
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
						<AudioRecord />;
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default AudioShipping;
