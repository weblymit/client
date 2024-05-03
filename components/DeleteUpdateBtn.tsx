"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeleteBtn({ id }: { id: number }) {
	// router
	const router = useRouter();
	// delete
	const handleDelete = async () => {
		await axios.delete(`http://localhost:3001/notes/${id}`);
		// redirect to the home page
		router.push("/");
		router.refresh();
	};
	return (
		<div className='pt-5 space-x-3'>
			<Link href={`/notes/${id}/update`}>
				<Button>Update</Button>
			</Link>
			<Button onClick={handleDelete} className='bg-red-500 hover:bg-red-600'>
				Delete
			</Button>
		</div>
	);
}
