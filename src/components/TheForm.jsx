import {useState} from "react";

function TheForm() {
	// categories and tags
	const categories = [
		"Programmazione e Sviluppo Web",
		"Framework per Frontend e Backend",
		"Gestione database relazionali",
		"Argomenti di interesse generale",
	];
	const tags = [
		"Frontend",
		"Backend",
		"HTML/CSS",
		"Javascript",
		"PHP",
		"MySql",
		"Vue JS",
		"React",
		"Laravel",
		"Express JS",
		"Node JS",
	];

	const initialTags = {};
	tags.forEach((tag) => {
		initialTags[tag] = false;
	});

	const initialData = {
		title: "",
		author: "",
		image: "https://picsum.photos/300/200",
		content: "",
		category: "",
		tags: initialTags,
		published: false,
	};
	const [articleData, setArticleData] = useState(initialData);
	const [articles, setArticles] = useState([]);

	// functions
	function handleChange(event) {
		const {name, value, type, checked} = event.target;
		if (type === "checkbox" && name === "tags") {
			setArticleData({
				...articleData,
				tags: {...articleData.tags, [value]: checked},
			});
		} else {
			setArticleData({
				...articleData,
				[name]: type === "checkbox" ? checked : value,
			});
		}
	}

	function handleEdit(articleId) {
		const articleToEdit = articles.find((article) => article.id === articleId);
		setArticleData(articleToEdit);
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		const newArticle = {
			...articleData,
			id: articleData.id ? articleData.id : crypto.randomUUID(),
		};

		let updatedArticles;
		if (articleData.id) {
			// Modifica di un articolo esistente
			updatedArticles = articles.map((article) =>
				article.id === articleData.id ? newArticle : article,
			);
		} else {
			// Aggiunta di un nuovo articolo
			updatedArticles = [...articles, newArticle];
		}

		setArticles(updatedArticles);
		setArticleData(initialData); // Reset del form
	}

	function handleDelete(id) {
		const updatedArticles = articles.filter((article) => article.id !== id);
		setArticles(updatedArticles);
	}

	return (
		<div>
			<form
				onSubmit={handleFormSubmit}
				className="flex flex-col items-center justify-center mt-10 space-y-4 w-full max-w-2xl mx-auto">
				{/* Titolo */}
				<div className="flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="title">
						Titolo:
					</label>
					<input
						className="border rounded-md px-2 py-1 flex-grow"
						type="text"
						name="title"
						id="title"
						value={articleData.title}
						onChange={handleChange}
					/>
				</div>

				{/* Autore */}
				<div className="flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="author">
						Autore:
					</label>
					<input
						className="border rounded-md px-2 py-1 flex-grow"
						type="text"
						name="author"
						id="author"
						value={articleData.author}
						onChange={handleChange}
					/>
				</div>

				{/* Immagine */}
				<div className="flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="image">
						Immagine:
					</label>
					<input
						className="border rounded-md px-2 py-1 flex-grow"
						type="text"
						name="image"
						id="image"
						value={articleData.image}
						onChange={handleChange}
					/>
				</div>

				{/* Contenuto */}
				<div className="flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="content">
						Contenuto:
					</label>
					<textarea
						className="border rounded-md px-2 py-1 w-full"
						name="content"
						id="content"
						value={articleData.content}
						onChange={handleChange}
					/>
				</div>

				{/* Categoria */}
				<div className="flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="category">
						Categoria:
					</label>
					<select
						className="border rounded-md px-2 py-1 w-full"
						name="category"
						id="category"
						value={articleData.category}
						onChange={handleChange}>
						<option value="">Seleziona una categoria</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				{/* Tags */}
				<div className="py-5 flex justify-between items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]">Tags:</label>
					<div className="flex flex-wrap gap-3 w-full">
						{Object.keys(articleData.tags).map((tag) => (
							<div key={tag} className="flex items-center">
								<input
									id={tag}
									type="checkbox"
									name="tags"
									value={tag}
									checked={articleData.tags[tag]}
									onChange={handleChange}
									className="mr-2"
								/>
								<label htmlFor={tag} className="text-violet-300">
									{tag}
								</label>
							</div>
						))}
					</div>
				</div>

				{/* Pubblicato */}
				<div className="flex items-center space-x-2 w-full">
					<label className="text-white min-w-[7rem]" htmlFor="published">
						Pubblicato:
					</label>
					<input
						type="checkbox"
						name="published"
						id="published"
						checked={articleData.published}
						onChange={handleChange}
					/>
				</div>

				{/* Bottone di invio */}
				<button
					type="submit"
					className="bg-purple-800 text-slate-200 px-4 py-2 rounded hover:bg-purple-600 hover:text-white">
					Aggiungi
				</button>
			</form>

			<div className="mt-12 flex justify-center text-zinc-300">
				<div className="w-full max-w-7xl">
					{articles.length > 0 && (
						<div className="grid grid-cols-7 gap-3 text-white mb-2">
							<div className="text-left font-bold">Titolo</div>
							<div className="text-left font-bold">Autore</div>
							<div className="text-left font-bold">Immagine</div>
							<div className="text-left font-bold">Categoria</div>
							<div className="text-left font-bold">Tags</div>
							<div className="text-left font-bold">Pubblicato</div>
							<div>Operazioni:</div>
						</div>
					)}
					{articles.map((article) => (
						<div
							className="grid grid-cols-7 gap-3 items-center bg-gray-800 px-4 py-2 rounded-md mb-2 text-sm"
							key={article.id}>
							<div className="text-left">{article.title}</div>
							<div className="text-left">{article.author}</div>
							<img
								className="w-40 rounded-md border-1 border-gray-300"
								src={article.image}
								alt=""
							/>
							<div className="text-left">{article.category}</div>
							<div className="text-left">
								{Object.entries(article.tags)
									.filter(([_, value]) => value)
									.map(([key, _]) => key)
									.join(", ")}
							</div>
							<div className="text-left">{article.published ? "Sì" : "No"}</div>
							<div className="flex gap-2">
								<button
									className="px-3 py-1 bg-blue-800 text-slate-200 rounded-md transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
									onClick={() => handleEdit(article.id)}>
									<i class="fa-solid fa-pen-to-square"></i> Modifica
								</button>
								<button
									className="px-3 py-1 bg-red-800 text-slate-200 rounded-md transition duration-200 ease-in-out hover:bg-red-600 hover:text-white"
									onClick={() => handleDelete(article.id)}>
									<i className="fa-solid fa-trash-can"></i> Cancella
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TheForm;
