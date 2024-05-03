import DeleteBtn from "@/components/DeleteUpdateBtn";
import axios from "axios";
import React from "react";

export default async function ShowPage({ params: { id } }: any) {
	// router
	// const router = useRouter();
	// fetch
	const fetchData = async () => {
		const response = await axios.get(`http://localhost:3001/notes/${id}`);
		return response.data;
	};
	const note = await fetchData();

	const formatTime = (date: Date) => {
		const dateNow = new Date();
		const diff = dateNow.getTime() - date.getTime();
		const diffDays = diff / (1000 * 3600 * 24);
		const diffHours = diff / (1000 * 3600);
		const diffMinutes = diff / (1000 * 60);
		const diffSeconds = diff / 1000;
		if (diffDays > 1) {
			return `${Math.floor(diffDays)} jours`;
		} else if (diffHours > 1) {
			return `${Math.floor(diffHours)} heures`;
		} else if (diffMinutes > 1) {
			return `${Math.floor(diffMinutes)} minutes`;
		} else {
			return `${Math.floor(diffSeconds)} secondes`;
		}
	};

	return (
		<div className='container py-10'>
			<h1 className='text-3xl pb-4 font-black'>Note</h1>
			<div className='bg-indigo-200 p-5 rounded-lg'>
				<div className='text-indigo-500'>
					{formatTime(new Date(note.createdAt))}
				</div>
				<div>{note.content}</div>
				<DeleteBtn id={note.id} />
			</div>
		</div>
	);
}
