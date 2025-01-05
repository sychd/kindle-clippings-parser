function parseKindleClippings(content: string): Record<string, string> {
	const entries = content.split('==========').map((entry) => entry.trim()).filter(Boolean);

	const books: Record<string, { title: string; author: string; clippings: string[]; }> = {};

	for (const entry of entries) {
		const lines = entry.split('\n').map((line) => line.trim()).filter(Boolean);
		if (lines.length < 3) continue;

		const [titleAndAuthor, , ...clippingContent] = lines;
		const [bookTitle, author] = titleAndAuthor.match(/^(.*) \((.*)\)$/)?.slice(1) || [titleAndAuthor, 'Unknown'];

		const clipping = clippingContent.join(' ');

		const cleanTitle = bookTitle.replace(/_/g, ' ');

		if (!books[cleanTitle]) {
			books[cleanTitle] = { title: cleanTitle, author, clippings: [] };
		}

		books[cleanTitle].clippings.push(clipping);
	}

	const mdFiles: Record<string, string> = {};

	for (const book of Object.values(books)) {
		const { title, author, clippings } = book;
		const mdContent = [
			`# ${title}`,
			`**Author:** ${author}`,
			'',
			...clippings.map((clipping) => `- ${clipping}`),
		].join('\n');

		mdFiles[`${title.replace(/[^a-zA-Z0-9а-яА-Я]/g, '_')}.md`] = mdContent;
	}

	return mdFiles;
}

export default parseKindleClippings;
