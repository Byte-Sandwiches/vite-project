<script>
    //@ts-nocheck
	import { Button } from "$lib/components/ui/button";
    import { env } from "$env/dynamic/public";
    import { toast } from "svelte-sonner";

    export let pincode, mid;

    async function sendReq() {
        try {
            if(!pincode) {
                toast.error("Enter pincode")
                return
            }
            const payload = {merchid : mid, pincode}

            const fd = new FormData()
            fd.append("data", JSON.stringify(payload));

            const res = await fetch(`${env.PUBLIC_API_URL}/check_av`, {
                method : "POST" ,
                body : fd
            });

            const data = await res.json();

            if(data.status === "success") {
                toast.info("Data processing...")
            } else if(data.status === "error") {
                toast.error(`Error processing data: ${data.msg}`)
            }
        } catch (err) {
            toast.error("Error processing data...")
            console.log(err)
        }
    }
</script>

<label for="pincodes" class="block mt-10 text-sm font-medium text-gray-300">Enter Pincode to Search for:</label>
<input type="text" id="pincodes" bind:value={pincode} class="w-full border p-2 rounded-md bg-gray-700 text-white mt-1" placeholder="Enter pincode">

<label for="merchant" class="block mt-4 text-sm font-medium text-gray-300">Enter Merchant to Search for:</label>
<input type="text" id="merchant" bind:value={mid} class="w-full border p-2 rounded-md bg-gray-700 text-white mt-1" placeholder="Enter merchantId">

<Button on:click={sendReq} class="mt-10" variant="default">Check Availability</Button>
