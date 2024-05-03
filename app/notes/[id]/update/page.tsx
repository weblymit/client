"use client";
import React, { useEffect, useState } from "react";
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
		.max(500, "Maximum 500 characters"),
});

export default function UpdateNote({
	params: { id },
}: {
	params: { id: number };
}) {
	const [note, setNote] = useState<any>(null);
	// fetch
	const fetchData = async () => {
		const response = await axios.get(`http://localhost:3001/notes/${id}`);
		setNote(response.data);
		// return response.data;
	};
	useEffect(() => {
		fetchData();
	}, []);

	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: note.content || "",
		},
	});

	// 2. Define your submit handler.
	function onSubmit(data: z.infer<typeof formSchema>) {
		// 3. Send data to the server.
		axios.put(`http://localhost:3001/notes/${id}`, {
			content: data.content,
		});
		// redirect to the home page
		router.push("/");
	}

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
								<FormLabel htmlFor='content'>Content</FormLabel>
								<Textarea
									{...field}
									id='content'
									// placeholder='Enter your note'
								/>
								<FormMessage {...field} />
							</FormItem>
						)}
					/>
					<FormControl>
						<Button type='submit'>Update</Button>
					</FormControl>
				</form>
			</Form>
		</div>
	);
}
