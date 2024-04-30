"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	content: z
		.string()
		.min(2, "Minimum 2 characters")
		.max(50, "Maximum 50 characters"),
});

export default function CreateNotePage() {
	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	});

	// 2. Define your submit handler.
	function onSubmit(data: z.infer<typeof formSchema>) {
		// 3. Send data to the server.
		axios.post("http://localhost:3001/notes", {
			content: data.content,
			userId: 2,
		});
		// redirect to the home page
		router.push("/");
	}

	// 4. Render the form.
	return (
		<div className='container py-10'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 max-w-lg mx-auto'
					autoComplete='off'
				>
					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Notes</FormLabel>
								<FormControl>
									<Textarea {...field} className='resize-y' rows={10} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}
