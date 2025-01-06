<script>
	import { goto } from '$app/navigation';

	const handleReturn = () => {
		goto('/');
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="flex flex-col gap-2 text-center">
		<h1 class="text-6xl font-bold text-gray-900">404</h1>
		<p class="text-md text-gray-600">Oops! Page not found.</p>
		<button
			on:click={handleReturn}
			class="mt-8 rounded-lg bg-blue-600 p-2 px-6 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Return Home
		</button>
	</div>
</div>
