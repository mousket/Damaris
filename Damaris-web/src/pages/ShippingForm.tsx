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

const formSchema = z.object({
	dateOfShipment: z.string().datetime(),
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
		height: z.number(),
		length: z.number(),
		width: z.number(),
		dimUnit: z.string(),
		weightUnit: z.string(),
		weight: z.number(),
	}),
	carrierAccounts: z.array(z.object({ name: z.string() })),
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

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Card className="bg-white/70 min-w-[500px]">
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
															disabled
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
															disabled
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
								<div key={field.id}>
									<FormField
										control={form.control}
										name={`carrierAccounts.${index}.name`}
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
									{index > 0 && (
										<Button onClick={() => remove(index)}>-</Button>
									)}
									<Button onClick={() => append({ name: "" })}>+</Button>
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
