<script>
    //@ts-nocheck
	import { Button } from "$lib/components/ui/button";
    import { env } from "$env/dynamic/public";
    import { toast } from "svelte-sonner";

    export let pincode;

    const csr_ = [
        {name : "row" , data: ""},
        {name : "col" , data: ""},
        {name : "value" , data: ""}
    ]

    async function sendReq() {
        try {
            if(!pincode) {
                toast.error("Enter pincode")
                return
            }

            const fd = new FormData()
            fd.append("csr", JSON.stringify(csr_));

            const res = await fetch(`${env.PUBLIC_API_URL}/${pincode}`, {
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

{#each csr_ as val}
    <label for={val.name} class="block mt-4 text-sm font-medium text-gray-300">Enter {val.name.toUpperCase()} Array</label>
    <input type="text"
        id={val.name}
        class="w-full border p-2 rounded-md bg-gray-700 text-white mt-1"
        placeholder={`Enter ${val.name} array here...`}
        bind:value={val.data}
    >
{/each}

<label for="pincodes" class="block mt-10 text-sm font-medium text-gray-300">Enter Pincode(s) to Search for:</label>
<input type="text" id="pincodes" bind:value={pincode} class="w-full border p-2 rounded-md bg-gray-700 text-white mt-1" placeholder="Enter pincode">

<Button on:click={sendReq} class="mt-4" variant="default">Search</Button>
