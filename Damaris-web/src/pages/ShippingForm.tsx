import { useForm } from "react-hook-form";
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

const formSchema = z.object({
	sourceAddress: z
		.string()
		.min(4, { message: "you must enter a valid address" }),
	destinationAddress: z
		.string()
		.min(4, { message: "you must enter a valid address" }),
	dateOfShippment: z
		.string()
		.min(4, { message: "you must enter a valid address" }),
});

const ShippingForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sourceAddress: "",
			destinationAddress: "",
			dateOfShippment: new Date().toDateString(),
		},
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
								name="sourceAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source address</FormLabel>
										<FormControl>
											<Input placeholder="from" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="destinationAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Destination address</FormLabel>
										<FormControl>
											<Input placeholder="to" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dateOfShippment"
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
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ShippingForm;
