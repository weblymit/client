import Link from "next/link";
import React from "react";

type Note = {
	note: any;
};

export default function CardNote({ note }: Note) {
	return (
		<Link href={`/notes/${note.id}`}>
			<div className='bg-indigo-200 p-5 rounded-lg'>
				<div>{note.content}</div>
			</div>
		</Link>
	);
}
