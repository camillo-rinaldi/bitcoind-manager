<script lang="ts">
    import { onMount } from 'svelte';
    import Block from './components/Block.svelte';
    import {getBlockCount, getBlockDetails} from '$lib/bitcoinApi';
    import { slide } from 'svelte/transition';

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
        console.log('New blocks: ', blocks);
    }

    async function fetchBlocksPeriodically() {
        await getLatestBlocks();
        setTimeout(fetchBlocksPeriodically, 30000);
    }

    onMount(() => {
        fetchBlocksPeriodically();
    });
</script>

<div class="min-h-screen flex flex-col items-center justify-center text-neutral-600 space-y-6">
    <h1 class="font-extrabold text-4xl mb-6 border-b-2 border-white pb-2">Bitcoin Core Manager</h1>
    <div class="mb-6 grid grid-cols-5 gap-x-5 bg-neutral-300 p-6 rounded-xl shadow-lg text-black">
        {#if blocks.length === 0}
            <div class="col-span-5 text-gray-600 p-10 mx-auto text-xl animate-pulse">Loading...</div>
        {/if}
        {#each blocks as block (block.blockNumber)}
            <div transition:slide="{{duration: 300}}">
                <Block blockNumber={block.blockNumber} blockDate={block.blockDate} txCount={block.txCount} />
            </div>
        {/each}
    </div>
</div>
