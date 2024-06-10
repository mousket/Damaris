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
import customEntityExtraction from "@/Domain/CustomEntityExtraction/customeEntityExtraction";

const AudioShipping = () => {
	const [handlePrompt, setHandlePrompt] = useState<{ prompt: string, handleResponse: (text: string) => Promise<boolean>} | null | undefined>(null);
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
		handleModelPrompt(rateScheme.models[1].hint);
		rateScheme.models[1]
	}, []);

	const handleModelPrompt = (text: string) => {
		setHandlePrompt({
			prompt: text,
			handleResponse: async (text: string) => {
				// extract entities
				console.log(text);
				const result = await customEntityExtraction(text);
				console.log(text, result);
				return new Promise<boolean>((resolve, reject) => {
					
				});
			}
		})
	}
	
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
						<AudioRecord handlePrompt={handlePrompt}/>;
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default AudioShipping;
