<script>
    //@ts-nocheck
	import { Button } from "$lib/components/ui/button";
    import { env } from "$env/dynamic/public";
    import { toast } from "svelte-sonner";
    import { realT } from "$lib/realtime";
    import { onMount } from "svelte";

    const csr_ = [
        {name : "row" , data: ""},
        {name : "col" , data: ""},
        {name : "value" , data: ""}
    ]

    let pincode = null

    $: console.log(csr_);

    let merchants = {
        pincode: "",
        data: ""
    }

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

    onMount(() => {
        realT.connect();
    })

    realT.subscribe("csr_", (err, ctx) => {
        if(err) {
            console.log(err);
            toast.error(`Error ${err}`);
            return
        }
        console.log(ctx);
        merchants.pincode = ctx.data.pin
        merchants.data = [...merchants.data, ...ctx.data.merch]
    })

    $ : console.log(merchants)
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparse Matrix Search</title>
</head>
<body>
    <div class="container mx-auto my-8 p-8 bg-gray-800 text-white rounded-md shadow-md max-w-2xl">

        <form id="matrixForm" class="mb-4">

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

            <Button class="mt-4" variant="default">Search</Button>
        </form>

        <div id="searchResults" class="mt-8 p-4 bg-gray-700 text-white rounded-md overflow-auto">
            {#if merchants.data.length > 0}
                Merchants ({merchants.data.length}) in Pincode {merchants.pincode}
                {JSON.stringify(merchants.data)}
            {/if}
        </div>
    </div>

</body>
