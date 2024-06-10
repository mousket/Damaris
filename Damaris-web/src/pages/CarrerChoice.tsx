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

const CarrerChoice = () => {
	const { state } = useLocation();
	const res = state as RateResponse;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Please choose the plan that befits you</CardTitle>
				<CardDescription>
					In the options below, please choose the plan you think that brings you
					the most benefits
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{res.rates.map((rate, index) => (
					<Button
						onClick={() =>
							Swal.fire({
								title: `You chose ${rate.carrier} for your shipping`,
								text: "You made an excelent choice for your shipping. Please visit us more often",
							})
						}
						key={index}
						type="submit"
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
		<Card>
			<CardHeader>
				<CardTitle>{rateDetails.carrier}</CardTitle>
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

export default CarrerChoice;
