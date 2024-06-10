import { useLocation } from "react-router-dom";
import type { RateDetails, RateResponse } from "@/API/Shipment/rate";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { rateResponse } from "@/API/Examples/ResponseExample";

const CarrierChoice = () => {
	// const { state } = useLocation();
	// const res = state as RateResponse;

	const res = rateResponse;

	return (
		<Card className="bg-white/35 overflow-scroll">
			<CardHeader className="text-center">
				<CardTitle>Please choose the plan that befits you</CardTitle>
				<CardDescription>
					In the options below, please choose the plan you think that brings you
					the most benefits
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 overflow-scroll">
				{res.rates.map((rate, index) => (
					<Button
						className="overflow-scroll h-full w-full bg-white hover:bg-gray-300"
						onClick={() =>
							Swal.fire({
								title: `You chose ${rate.carrier} for your shipping`,
								text: "You made an excelent choice for your shipping. Please visit us more often",
								icon: "success",
							})
						}
						key={index}
						type="button"
					>
						<CarrerCard rateDetails={rate} />
					</Button>
				))}
			</CardContent>
		</Card>
	);
};

const CarrerCard = ({ rateDetails }: { rateDetails: RateDetails }) => {
	return (
		<Card className="w-full text-left bg-transparent">
			<CardHeader>
				<CardTitle className="uppercase text-center text-2xl sm:text-5xl">
					{rateDetails.carrier}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Base charge</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.baseCharge}
						</p>
					</div>
				</div>
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Currency Code</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.currencyCode}
						</p>
					</div>
				</div>
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							Additionnal details on delivery
						</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.deliveryCommitment.additionalDetails}
						</p>
					</div>
				</div>
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							Estimate delivery date time
						</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.deliveryCommitment.estimatedDeliveryDateTime}
						</p>
					</div>
				</div>
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							Delivery garantee
						</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.deliveryCommitment.guarantee}
						</p>
					</div>
				</div>
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Parcel Type</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.parcelType}
						</p>
					</div>
				</div>
				{rateDetails.surcharges.map((charge, index) => (
					<div
						key={index}
						className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
					>
						<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">{charge.name}</p>
							<p className="text-sm text-muted-foreground">{charge.fee}</p>
						</div>
					</div>
				))}
				<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							Total carreer charge
						</p>
						<p className="text-sm text-muted-foreground">
							{rateDetails.totalCarrierCharge}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CarrierChoice;
