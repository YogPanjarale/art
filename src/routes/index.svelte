<script context="module" lang="ts">
     import type {Load} from '@sveltejs/kit'
     import {routes} from '$lib/routes'
    export const load :Load = ({params,fetch,session,url,stuff})=> {
        const query = url.searchParams.get('art')
        return {
            props:{
                art : query,
            }
        }
    }
</script>

<script lang="ts">
    export let art:string;
    import { onMount } from 'svelte';

    import{MetaTags} from 'svelte-meta-tags'
    onMount(()=>{
        console.log(art)
        // check if art is in routes list
        if (!!art){
        if(!routes.includes(art)){
            // if not redirect to 404
            window.location.href = '/404'
        }
        import("$lib/main")
        }
    })

</script>
<svelte:head>
    <MetaTags title="Art" description="generative digital art - by Yog Panjarale" />
</svelte:head>
{#if !!art}    
<div id="app">
    <canvas height='500' width='500' id="canvas"></canvas>
</div>
{:else}
<div class="flex h-screen justify-center p-12">
    <h1 class="text-2xl text-white font-blinker hover:scale-105">Art</h1>
    <div class="flex">
        
    </div>
</div>

    {/if}

