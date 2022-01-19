<script>
    export let href;
    export let text;
    export let showEmbed=false;
    let embedUrl = "/?art="+text;
</script>

<style>
    /* your styles go here */
</style>
<div class="border-gray-500 border-2  bg-gray-100 m-1">

    {#if showEmbed}
    <iframe src="{embedUrl}" width="256px" height="256px" frameborder="0" allowfullscreen title="{"Art: "+text}"></iframe>
    {/if}
    
    <a class="text-2xl text-black font-blinker p-2 py-1 " href={href} >{text}</a>
</div>