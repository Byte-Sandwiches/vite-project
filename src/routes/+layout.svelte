<script>
	import "../app.css"
	import { Toaster } from "svelte-sonner";
	import Transition from "$lib/components/Transition.svelte";

	import { page } from "$app/stores";
</script>

<Toaster />
<div>
  <Transition url={$page.url}>
    <slot />
  </Transition>
</div>
