import React from "react";

type Note = {
	note: any;
};

export default function CardNote({ note }: Note) {
	return (
		<div className='bg-yellow-200 p-5 rounded-lg'>
			<div>{note.content}</div>
		</div>
	);
}
