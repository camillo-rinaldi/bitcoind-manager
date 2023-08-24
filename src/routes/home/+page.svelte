<script lang="ts">
    import {onMount} from 'svelte';
    import BlockDate from "./components/BlockDate.svelte";


    let blockCount: number | null = null

    async function getBlockCount() {
        const rpcBody = {
            jsonrpc: "1.0",
            id: "test",
            method: "getblockcount",
            params: []
        };


        try {
            const response = await fetch('/api/bitcoind', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rpcBody)
            });

            const data = await response.json();
            blockCount = data.result;
        } catch (e) {
            //
        }

    }

    let intervalId;

    onMount(() => {
        // Fetch the block count immediately upon mounting
        getBlockCount();

        // Set an interval to fetch the block count every 5 seconds
        intervalId = setInterval(getBlockCount, 5000);

        // Cleanup the interval when the component is destroyed
        return () => {
            clearInterval(intervalId);
        };
    });
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 class="text-2xl font-semibold mb-4">Bitcoin Core Info</h1>
        <BlockDate blockHeight="{blockCount}" />
        <div class="flex items-center justify-between">
            <p class="text-xl font-medium">Block Count: <span class="text-blue-500">{blockCount ?? "Loading..."}</span></p>
            <button on:click={getBlockCount} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Refresh
            </button>
        </div>
    </div>
</div>
