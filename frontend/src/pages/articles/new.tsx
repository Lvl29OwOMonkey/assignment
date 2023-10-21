import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import Head from "next/head";
import NodeJS from "node:process";

const NewDiscussion = () => {
	const [title, setTitle] = useState("");
	const [authors, setAuthors] = useState<string[]>([]);
	const [source, setSource] = useState("");
	const [pubYear, setPubYear] = useState(new Date().getFullYear());
	const [doi, setDoi] = useState("");
	const [volume, setVolume] = useState("");
	const [pages, setPages] = useState(0);
	const [sePractice, setSePractice] = useState<string>("");

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

	async function submitNewArticle(
		event: FormEvent<HTMLFormElement>
	): Promise<any> {
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			setSubmitted(false);
			setError("");
		}

		event.preventDefault();

		try {
			const result = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title,
						authors,
						source,
						pubYear,
						doi,
						volume,
						pages,
						se: sePractice,
					}),
				}
			);
			if (result.status === 200) {
				setSubmitted(true);
			} else {
				const data = await result.json();
				if (data.error == "ValidationError") {
					const message = data.message
						.map((item: any) => {
							// Replace first character with uppercase
							item.field =
								item.field.charAt(0).toUpperCase() + item.field.slice(1);
							return `${item.field}: ${item.message}.`;
						})
						.join("\n");
					setError(message);
				} else {
					setError(data.message);
				}
			}
		} catch (err) {
			setError("Error submitting new article");
		}

		setHideTimeout(
			setTimeout(() => {
				setSubmitted(false);
				setError("");
			}, 5000)
		);
	}

	// Some helper methods for the authors array
	const addAuthor = () => {
		setAuthors(authors.concat([""]));
	};
	const removeAuthor = (index: number) => {
		setAuthors(authors.filter((_, i) => i !== index));
	};
	const changeAuthor = (index: number, value: string) => {
		setAuthors(
			authors.map((oldValue, i) => {
				return index === i ? value : oldValue;
			})
		);
	};
	// Return the full form
	return (
		<div className="container">
			<Head>
				<title>New Article</title>
			</Head>
			<h1 className="text-3xl font-bold">New Article</h1>
			<form className={formStyles.form} onSubmit={submitNewArticle}>
				<label htmlFor="title">Title:</label>
				<input
					className={formStyles.formItem}
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(event) => {
						setTitle(event.target.value);
					}}
					required
				/>
				<label htmlFor="author">Authors:</label>
				{authors.map((author, index) => {
					return (
						<div key={`author ${index}`} className={formStyles.arrayItem}>
							<input
								type="text"
								name="author"
								value={author}
								onChange={(event) => changeAuthor(index, event.target.value)}
								className={formStyles.formItem}
								required
							/>
							<button
								onClick={() => removeAuthor(index)}
								className={formStyles.buttonItem}
								style={{ marginLeft: "3rem" }}
								type="button"
							>
								-
							</button>
						</div>
					);
				})}
				<button
					onClick={() => addAuthor()}
					className={formStyles.buttonItem}
					style={{ marginLeft: "auto" }}
					type="button"
				>
					+
				</button>
				<label htmlFor="source">Journal Name:</label>
				<input
					className={formStyles.formItem}
					type="text"
					name="source"
					id="source"
					value={source}
					onChange={(event) => {
						setSource(event.target.value);
					}}
					required
				/>
				<label htmlFor="pubYear">Publication Year:</label>
				<input
					className={formStyles.formItem}
					type="number"
					name="pubYear"
					id="pubYear"
					value={pubYear}
					min={1900}
					max={new Date().getFullYear()}
					onChange={(event) => {
						const val = event.target.value;
						if (val === "") {
							setPubYear(0);
						} else {
							setPubYear(parseInt(val));
						}
					}}
					required
				/>
				<label htmlFor="volume">Volume:</label>
				<input
					className={formStyles.formItem}
					type="number"
					name="volume"
					value={volume}
					onChange={(event) => setVolume(event.target.value)}
					required
				/>
				<label htmlFor="pages">Pages:</label>
				<input
					className={formStyles.formItem}
					type="number"
					name="pages"
					id="pages"
					value={pages}
					onChange={(event) => setPages(parseInt(event.target.value))}
					required
				/>
				<label htmlFor="doi">DOI:</label>
				<input
					className={formStyles.formItem}
					type="text"
					name="doi"
					id="doi"
					value={doi}
					onChange={(event) => {
						setDoi(event.target.value);
					}}
					required
				/>
				<label htmlFor="sePractice">Software Engineering Practice:</label>
				<select
					className={formStyles.formItem}
					name="Software Engineering Practice"
					id="sePractice"
					value={sePractice}
					onChange={(event) => setSePractice(event.target.value)}
				>
					<option value="" hidden disabled>
						Select SE practice...
					</option>
					<option value="agile">Agile</option>
					<option value="sprint">Sprint</option>
					<option value="mob_programming">Mob Programming</option>
				</select>
				<button className={formStyles.submitButton} type="submit">
					Submit
				</button>
				{submitted && <p>Article submitted successfully!</p>}
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};
export default NewDiscussion;
