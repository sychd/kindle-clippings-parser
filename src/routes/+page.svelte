<script lang="ts">
	import { writable } from 'svelte/store';
	import parseKindleClippings from './parseKindleClippings';

	let files: File[] = [];
	const parsedFiles = writable<Record<string, string>>({});

	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			files = Array.from(input.files);
		}
	}

	async function processFiles() {
		for (const file of files) {
			const content = await file.text();
			const mdFiles = parseKindleClippings(content);
			parsedFiles.set(mdFiles);
		}
	}

	function downloadFile(name: string, content: string) {
		const blob = new Blob([content], { type: 'text/markdown' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = name;
		link.click();
		URL.revokeObjectURL(link.href);
	}
</script>

<main class="flex min-h-screen flex-col items-center bg-gray-50 p-4">
	<div class="flex max-w-[860px] flex-1 flex-col items-center">
		<section class="max-w-xl py-8">
			<div class="mx-auto max-w-3xl">
				<h2 class="mb-6 text-center text-3xl font-semibold text-gray-800">
					Kindle Notes to Markdown Converter
				</h2>
				<p class="mb-4 text-lg text-gray-600">
					Convert your Kindle highlights and notes into an organized Markdown file with ease. Simply
					upload your `.txt` file containing your Kindle excerpts, and the tool will:
				</p>
				<ul class=" list-inside list-disc text-lg text-gray-700">
					<li>Extract the book title, author and clippings</li>
					<li>List all your Kindle highlights and notes in order</li>
				</ul>
			</div>
		</section>
		<div class="w-full max-w-xl rounded-lg bg-white p-4 shadow-lg">
			<label for="file-upload" class="mb-2 block text-sm font-medium text-gray-700">
				Upload Kindle "My Clippings.txt" file(s)
			</label>
			<input
				type="file"
				id="file-upload"
				multiple
				accept=".txt"
				class="border-secondary-500 text-surface file:text-surface focus:border-primary focus:shadow-inset relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid bg-transparent bg-clip-padding px-3 py-1 text-sm font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-blue-600 file:px-3 file:py-[0.32rem] file:text-white file:hover:bg-blue-700 focus:text-gray-700 focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
				on:change={handleFileUpload}
			/>
			<button
				class="mt-4 w-full rounded-lg bg-blue-600 py-1 text-white hover:bg-blue-700"
				on:click={processFiles}
			>
				Parse Files
			</button>
		</div>

		<div class="mt-8 w-full max-w-xl flex-1">
			<h2 class="mb-4 text-xl font-bold">Downloaded Files</h2>
			{#if $parsedFiles && Object.keys($parsedFiles).length > 0}
				<ul class="space-y-2">
					{#each Object.entries($parsedFiles) as [name, content]}
						<li class="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow">
							<span class="truncate">{name}</span>
							<button
								class="text-blue-600 hover:underline"
								on:click={() => downloadFile(name, content)}
							>
								Download
							</button>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-500">No files parsed yet.</p>
			{/if}
		</div>

		<div class="mt-8 flex w-full max-w-md items-center justify-center text-sm">
			Created by &nbsp;<a class="text-blue-600 hover:text-blue-700" href="https://chillyhill.me/"
				>Denys Sych</a
			>
		</div>
	</div>
</main>
