<script>
    //@ts-nocheck
	import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import { realT } from "$lib/realtime";
    import { onMount } from "svelte";
    import GetMerchants from "$lib/components/GetMerchants.svelte";
    import CheckMerchant from "$lib/components/CheckMerchant.svelte";

    const csr_ = [
        {name : "row" , data: ""},
        {name : "col" , data: ""},
        {name : "value" , data: ""}
    ]

    let pincode, mid = null
    let doesServe = null

    $: console.log(csr_);

    let merchants = {
        pincode: "",
        data: ""
    }

    onMount(() => {
        realT.connect();
    })

    realT.subscribe(`csr_${pincode}`, (err, ctx) => {
        if(err) {
            console.log(err);
            toast.error(`Error ${err}`);
            return
        }

        switch(ctx.data.type) {
            case "get_merchants":
                merchants.pincode = ctx.data.pin
                merchants.data = ctx.data.merch
                break;
            case "check_merchant":
                doesServe = ctx.data.does || false
                break;
        }
    })

    let checked = {
        getMerchants: false,
        checkMerchant: false
    }

</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparse Matrix Search</title>
</head>
<body>
    <div class="container mx-auto my-8 p-8 bg-gray-800 text-white rounded-md shadow-md max-w-2xl">

        <form id="matrixForm" class="mb-4">
            <!-- i know so trivial lol -->
            <Button on:click={() => {
                checked.getMerchants=!checked.getMerchants
                checked.checkMerchant=false
            }} >Get Merchants</Button>

            <Button on:click={() => {
                checked.checkMerchant=!checked.checkMerchant
                checked.getMerchants=false
            }} >Check Merchant</Button>

            {#if checked.getMerchants}
                <GetMerchants {pincode} />
            {:else if checked.checkMerchant}
                <CheckMerchant {pincode} {mid} />
            {/if}
        </form>

        <div id="searchResults" class="mt-8 p-4 bg-gray-700 text-white rounded-md overflow-auto">
            {#if merchants.data.length > 0}
                Merchants ({merchants.data.length}) in Pincode {merchants.pincode}
                {JSON.stringify(merchants.data)}
            {/if}

            {#if doesServe !== null}
                {#if doesServe}
                    Merchant is served by pincode
                {:else}
                    Merchant is not served by pincode
                {/if}

            {/if}
        </div>
    </div>

</body>
