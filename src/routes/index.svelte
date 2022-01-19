<script context="module" lang="ts">
   export const load = async ({params,fetch,session,url,stuff})=> {
       const query = url.searchParams.get('art')
       return {
           props:{
               art : query,
           }
       }
   }
</script>
<script lang="ts">
	import { routes } from '$lib/routes';
	export let art;
	import Tile from '$lib/tile.svelte';
	import { onMount } from 'svelte';

	import { MetaTags } from 'svelte-meta-tags';
	onMount(() => {
		console.log(art);
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
	<MetaTags title={art?art+"Art":"Art"} description={`${art} generative digital art - by Yog Panjarale"`} />
</svelte:head>
{#if !!art}
	<div id="app">
		<canvas height="500" width="500" id="canvas" />
	</div>
{:else}
	<div class="flex flex-col items-center  justify-center p-12">
		<h1 class="text-2xl text-white font-blinker hover:scale-105 ">Generative Art Peices</h1>

		<div class="flex flex-row flex-wrap justify-center  space-y-2 space-x-2 ">
			<div />
			{#each routes as item}
				{@const href = `/?art=${item}`}
				<Tile {href} text={item} showEmbed />
			{/each}
		</div>
	</div>
{/if}
