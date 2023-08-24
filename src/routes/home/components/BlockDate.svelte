<script lang="ts">
    import {onMount} from 'svelte';

    export let blockHeight: number | null;

    let blockDate = "Loading...";

    $: if (blockHeight) {
        fetchBlockDate(blockHeight);
    }

    async function fetchBlockDate(blockHeight) {
        blockDate = await getBlockDate(blockHeight);
    }

    async function getBlockDate(blockHeight) {
        // First, get the block hash for the given block height
        const hashResponse = await fetch('/api/bitcoind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "1.0",
                id: "test",
                method: "getblockhash",
                params: [blockHeight]
            })
        });

        const hashData = await hashResponse.json();
        const blockHash = hashData.result;

        // Now, get the block details using the block hash
        const blockResponse = await fetch('/api/bitcoind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "1.0",
                id: "test",
                method: "getblock",
                params: [blockHash]
            })
        });

        const blockData = await blockResponse.json();
        const blockTime = blockData.result.time;

        // Convert the block timestamp to a human-readable date
        return new Date(blockTime * 1000).toLocaleString();
    }

    onMount(() => {
        fetchBlockDate(blockHeight);
    });
</script>

<p class="text-gray-600">Date of Current Block: <span class="font-medium">{blockDate}</span></p>
