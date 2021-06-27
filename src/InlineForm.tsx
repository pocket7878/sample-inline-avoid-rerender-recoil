import { memo, useCallback, useState } from "react";

type Props = {
	title: string,
	initialValue: string,
	onSubmit: (value: string) => void;
}

export const InlineForm = memo(function InlineForm({title, initialValue, onSubmit}: Props) {
	console.log(`Render: ${title} form with initialValue ${initialValue}`);

	const [value, setValue] = useState(initialValue);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			console.log(`submit ${value}`);
			onSubmit(value);
		},
		[onSubmit, value],
	);

	return (
		<form onSubmit={handleSubmit}>
			<label>{title}</label>
			<input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
			<input type="submit" value={`Update ${title}`}/>
		</form>
	)
});