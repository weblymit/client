import React from "react";
import axios from "axios";
import CardNote from "@/components/ui/CardNote";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// fetch data from server
const fetchData = async () => {
	const response = await axios.get("http://localhost:3001/notes");
	return response.data;
};

const Page = async () => {
	const notes = await fetchData();
	console.log("notes:", notes);

	// useEffect(() => {
	// 	const response = axios
	// 		.get("http://localhost:3001/notes")
	// 		.then((res) => console.log(res.data));
	// }, []);

	return (
		<div className='container py-10'>
			<h1 className='text-3xl pb-4 font-black'>Notes</h1>
			<div className='flex justify-end'>
				<Link href='/create'>
					<Button className='mb-5 '>Create</Button>
				</Link>
			</div>
			{notes.length <= 0 ? (
				<div className='text-center text-2xl'>No notes ...</div>
			) : (
				<div className='grid grid-cols-3 gap-5'>
					{notes?.map((note: any) => (
						<CardNote key={note.id} note={note} />
					))}
				</div>
			)}
		</div>
	);
};

export default Page;
