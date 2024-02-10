<script>
    import { blur } from "svelte/transition";

    /**
     * @type {any}
     */
    export let url;
</script>

{#key url}
    <div in:blur={{ duration: 300 }}>
        <slot/>
    </div>
{/key}
