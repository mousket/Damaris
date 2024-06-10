import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Switch } from "@/components/ui/switch";
import { getShipmentRate } from "@/API/Shipment/rate";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	dateOfShipment: z.string().date(),
	fromAddress: z.object({
		addressLine1: z.string(),
		addressLine2: z.string(),
		addressLine3: z.string(),
		cityTown: z.string(),
		email: z.string().email(),
		phone: z.string().min(8, "Please enter a valid phone number"),
		postalCode: z.string().length(5, "Please enter a valid postal code"),
		residential: z.boolean(),
		stateProvince: z.string(),
	}),
	parcel: z.object({
		height: z.coerce.number(),
		length: z.coerce.number(),
		width: z.coerce.number(),
		dimUnit: z.string(),
		weightUnit: z.string(),
		weight: z.coerce.number(),
	}),
	carrierAccounts: z.array(
		z.object({ name: z.string().min(1, "Enter a valid carrier account") })
	),
	parcelType: z.string(),
	parcelId: z.string(),
	toAddress: z.object({
		addressLine1: z.string(),
		addressLine2: z.string(),
		addressLine3: z.string(),
		cityTown: z.string(),
		email: z.string().email(),
		phone: z.string().min(8, "Please enter a valid phone number"),
		postalCode: z.string().length(5, "Please enter a valid postal code"),
		residential: z.boolean(),
		stateProvince: z.string(),
	}),
});

const ShippingForm = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			dateOfShipment: new Date().toDateString(),
			fromAddress: {
				addressLine1: "",
				addressLine2: "",
				addressLine3: "",
				cityTown: "",
				email: "",
				phone: "",
				postalCode: "",
				residential: false,
				stateProvince: "",
			},
			parcel: {
				height: 0,
				length: 0,
				width: 0,
				weight: 0,
				dimUnit: "",
				weightUnit: "",
			},
			carrierAccounts: [{ name: "" }],
			parcelType: "",
			parcelId: "",
			toAddress: {
				addressLine1: "",
				addressLine2: "",
				addressLine3: "",
				cityTown: "",
				email: "",
				phone: "",
				postalCode: "",
				residential: false,
				stateProvince: "",
			},
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "carrierAccounts",
		control: form.control,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const request: RateRequest = {
			dateOfShipment: values.dateOfShipment,
			fromAddress: {
				addressLine1: values.fromAddress.addressLine1,
				addressLine2: values.fromAddress.addressLine2,
				addressLine3: values.fromAddress.addressLine3,
				cityTown: values.fromAddress.cityTown,
				company: "",
				countryCode: "",
				email: values.fromAddress.email,
				name: "",
				phone: values.fromAddress.phone,
				postalCode: values.fromAddress.postalCode,
				stateProvince: values.fromAddress.stateProvince,
				residential: values.fromAddress.residential ?? false,
			},
			parcel: {
				height: values.parcel.height,
				length: values.parcel.length,
				width: values.parcel.width,
				dimUnit: values.parcel.dimUnit,
				weightUnit: values.parcel.weightUnit,
				weight: values.parcel.weight,
			},
			carrierAccounts: values.carrierAccounts.map(x => x.name),
			parcelType: values.parcelType,
			parcelId: values.parcelId,
			serviceId: "",
			toAddress: {
				addressLine1: values.toAddress.addressLine1,
				addressLine2: values.toAddress.addressLine2,
				addressLine3: values.toAddress.addressLine3,
				cityTown: values.toAddress.cityTown,
				company: "",
				countryCode: "",
				email: values.toAddress.email,
				name: "",
				phone: values.toAddress.phone,
				postalCode: values.toAddress.postalCode,
				stateProvince: values.toAddress.stateProvince,
				residential: values.toAddress.residential ?? false,
			},
		};

		const response = await getShipmentRate(request);
		navigate("/carrerchoice", { state: response });
	}

	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Card className="bg-white/70 min-w-[500px] w-full sm:w-2/3 overflow-scroll">
				<CardHeader>
					<CardTitle>Shipping command</CardTitle>
					<CardDescription>Enter the shipping informations</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="dateOfShipment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date shippment</FormLabel>
										<FormControl>
											<Input placeholder="when" {...field} type="date" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Accordion type="multiple" className="w-full">
								<AccordionItem value="from-address">
									<AccordionTrigger>From Address</AccordionTrigger>
									<AccordionContent>
										<FormField
											control={form.control}
											name="fromAddress.addressLine1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 1</FormLabel>
													<FormControl>
														<Input placeholder="Address line 1" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.addressLine2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 2</FormLabel>
													<FormControl>
														<Input placeholder="Address line 2" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.addressLine3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 3</FormLabel>
													<FormControl>
														<Input placeholder="Address line 3" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.cityTown"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City Town</FormLabel>
													<FormControl>
														<Input placeholder="City town" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input placeholder="example@gmail.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number</FormLabel>
													<FormControl>
														<Input placeholder="+1 954 123 12 34" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.postalCode"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Postal code</FormLabel>
													<FormControl>
														<Input placeholder="33150" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.residential"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Is residential
														</FormLabel>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
															aria-readonly
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="fromAddress.stateProvince"
											render={({ field }) => (
												<FormItem>
													<FormLabel>State Provice</FormLabel>
													<FormControl>
														<Input placeholder="state province" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="to-address">
									<AccordionTrigger>To Address</AccordionTrigger>
									<AccordionContent>
										<FormField
											control={form.control}
											name="toAddress.addressLine1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 1</FormLabel>
													<FormControl>
														<Input placeholder="Address line 1" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.addressLine2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 2</FormLabel>
													<FormControl>
														<Input placeholder="Address line 2" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.addressLine3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address Line 3</FormLabel>
													<FormControl>
														<Input placeholder="Address line 3" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.cityTown"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City Town</FormLabel>
													<FormControl>
														<Input placeholder="City town" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input placeholder="example@gmail.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number</FormLabel>
													<FormControl>
														<Input placeholder="+1 954 123 12 34" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.postalCode"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Postal code</FormLabel>
													<FormControl>
														<Input placeholder="33150" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.residential"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Is residential
														</FormLabel>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
															aria-readonly
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="toAddress.stateProvince"
											render={({ field }) => (
												<FormItem>
													<FormLabel>State Province</FormLabel>
													<FormControl>
														<Input placeholder="State Province" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="parcel">
									<AccordionTrigger>Package Information</AccordionTrigger>
									<AccordionContent>
										<FormField
											control={form.control}
											name="parcel.height"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package height</FormLabel>
													<FormControl>
														<Input
															placeholder="10.3"
															{...field}
															type="number"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="parcel.length"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package length</FormLabel>
													<FormControl>
														<Input
															placeholder="20.6"
															{...field}
															type="number"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="parcel.width"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package width</FormLabel>
													<FormControl>
														<Input placeholder="15" {...field} type="number" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="parcel.weight"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package weight</FormLabel>
													<FormControl>
														<Input placeholder="50" {...field} type="number" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="parcel.dimUnit"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Dimensions unit</FormLabel>
													<FormControl>
														<Input placeholder="inches" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="parcel.weightUnit"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package weight</FormLabel>
													<FormControl>
														<Input placeholder="ounces" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							{fields.map((field, index) => (
								<div className="flex gap-4 items-end" key={field.id}>
									<FormField
										control={form.control}
										name={`carrierAccounts.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>carrier accounts</FormLabel>
												<FormControl>
													<Input placeholder="carrer..." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{index > 0 && (
										<Button type="button" onClick={() => remove(index)}>
											-
										</Button>
									)}
									<Button type="button" onClick={() => append({ name: "" })}>
										+
									</Button>
								</div>
							))}
							<FormField
								control={form.control}
								name="parcelType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Package type</FormLabel>
										<FormControl>
											<Input placeholder="Package type" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="parcelId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Package Id</FormLabel>
										<FormControl>
											<Input placeholder="Package Id" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ShippingForm;
