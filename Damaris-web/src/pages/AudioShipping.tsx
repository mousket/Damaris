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
import Prompt from "@/Base/Prompt";

const AudioShipping = () => {
	const [handlePrompt, setHandlePrompt] = useState<{ prompt: string, waitForResponse: boolean, handleResponse: (text?: string) => Promise<boolean>} | null | undefined>(null);
	const [modelIdx, setModelIdx] = useState<number | null>(null);
	const [currentPrompt, setCurrentPrompt] = useState<Prompt<unknown> | null>(null)

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
			prompt: "Greetings, I am here to help you set your shippment information in order to get you the available services. follow the next steps so we can get your parcel shipped",
			waitForResponse: false,
			handleResponse: async () => {
				console.log("after greeetings");
				setModelIdx(0);
				return true;
			}
		});
	}, [])

	useEffect(() => {
		console.log("begin");
		if(modelIdx != null)
			handleModelPrompt();
	}, [modelIdx]);

	useEffect(() => {
		if(currentPrompt)
			handleCurrentPrompt();
	}, [currentPrompt])

	const handleModelPrompt = () => {
		setHandlePrompt({
			prompt: rateScheme.models[modelIdx].hint,
			waitForResponse: true,
			handleResponse: async (text?: string) => {
				// extract entities
				const result = await customEntityExtraction(text!);
				console.log("results", result);
				return new Promise<boolean>((resolve, reject) => {
					if(result.length === 0) {
						reject(false);
					}
					else {
						rateScheme.models[modelIdx].setEntities(result);
						const prompt = getNextUnsetPrompt(rateScheme.models[modelIdx].prompt)
						console.log("prompt", prompt);
						if(prompt) setCurrentPrompt(prompt);
						else if (!prompt && rateScheme.models.length > modelIdx + 1) {
							setModelIdx(modelIdx + 1);
						}
						resolve(true);	
					} 
				});
			}
		})
	}

	const handleCurrentPrompt = () => {
		setHandlePrompt({
			prompt: currentPrompt!.hint,
			waitForResponse: true,
			handleResponse: async (text?: string) => {
				// extract entities
				const result = await customEntityExtraction(text!);
				return new Promise<boolean>((resolve, reject) => {
					if(result.length === 0) {
						reject(false);
					}
					else {
						if(currentPrompt?.setValue(Object.values(result[0])[0])) {
							resolve(true);
							const prompt = getNextUnsetPrompt(currentPrompt)
							if(prompt) setCurrentPrompt(prompt)
							else if(!prompt && rateScheme.models.length > modelIdx + 1) {
								setModelIdx(modelIdx + 1);
							}
						}
						else
							reject(false);
					} 
				});
			}
		})
	}

	const getNextUnsetPrompt = (prompt : Prompt<any>) => {
		let currentPrompt = prompt
		while(currentPrompt && currentPrompt.isSet ) {
			currentPrompt = currentPrompt.getNextPrompt()!;
		}
		return currentPrompt;
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
