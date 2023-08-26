<script lang="ts">
    import { onMount } from 'svelte';
    import Block from './components/Block.svelte';
    import {getBlockCount, getBlockDetails} from '$lib/bitcoinApi';

    let blocks = [];
    let latestBlockNumber: number | null = null;

    async function getLatestBlocks() {
        const blockCount = await getBlockCount();
        if (blockCount === latestBlockNumber) {
            console.log('No new blocks');
            return;
        }
        latestBlockNumber = blockCount;
        console.log('New block count: ', blockCount);

        const newBlocks = [];
        for (let i = 4; i >= 0; i--) {
            const blockNumber = blockCount - i;
            const blockDetails = await getBlockDetails(blockNumber);
            newBlocks.push({ blockNumber, ...blockDetails });
        }

        // Update the blocks array with the new blocks
        blocks = newBlocks;
    }

    onMount(() => {
        getLatestBlocks();
        const intervalId = setInterval(getLatestBlocks, 30000);
        return () => {
            clearInterval(intervalId);
        };
    });
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
    <h1 class="font-bold text-3xl">Bitcoin Core Manager</h1>
    <div class="w-full max-w-screen-lg flex justify-between mb-6">
        {#if blocks.length === 0}
            <div class="text-gray-500 my-10 mx-auto text-1xl">Loading...</div>
        {/if}
        {#each blocks as block (block.blockNumber)}
            <Block blockNumber={block.blockNumber} blockDate={block.blockDate} txCount={block.txCount} />
        {/each}
    </div>
</div>
