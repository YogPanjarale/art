<script context="module" lang="ts">
	import type {Load} from '@sveltejs/kit'
	export const load:Load = async ({ params, fetch, session, url, stuff }) => {
		const query = url.searchParams.get('art');
		// const isMobile = stuff.isMobile;
		return {
			props: {
				art: query

			}
		};
	};
</script>

<script lang="ts">
	import { routes } from '$lib/routes';
	export let art;
	import Tile from '$lib/tile.svelte';
	import { onMount } from 'svelte';
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}
	let displayEmbeds=false;
	import { MetaTags } from 'svelte-meta-tags';
	onMount(() => {
		console.log(art);
		displayEmbeds = !isMobile();
		// check if art is in routes list
		if (!!art) {
			if (!routes.includes(art)) {
				// if not redirect to 404
				window.location.href = '/404';
			}
			import('$lib/main');
		}
	});
</script>

<svelte:head>
	<MetaTags
		title={art ? art + ' Art' : 'Art'}
		description={`${art} generative digital art - by Yog Panjarale"`}
	/>
</svelte:head>
{#if !!art}
	<div id="app">
		<canvas height="500" width="500" id="canvas" />
	</div>
{:else}
	<div class={`flex flex-col items-center ${displayEmbeds?"h-full":"h-screen"} justify-center p-12`}>
		<h1 class="text-2xl text-white font-blinker hover:scale-105 ">Generative Art Peices</h1>

		<div class="flex flex-row flex-wrap justify-center  space-y-2 space-x-2 ">
			<div />
			{#each routes as item}
				{@const href = `/?art=${item}`}
				<Tile {href} text={item} showEmbed={displayEmbeds} />
			{/each}
		</div>
	</div>
{/if}
