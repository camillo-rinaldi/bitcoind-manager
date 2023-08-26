<script lang="ts">
    import { onMount } from 'svelte';
    import Block from './components/Block.svelte';
    import {getBlockCount, getBlockDetails} from '$lib/bitcoinApi';

    let blocks = [];
    let latestBlockNumber: number | null = null;

    async function getLatestBlocks() {
        const blockCount = await getBlockCount();
        if (blockCount === latestBlockNumber) {
            return;
        }
        latestBlockNumber = blockCount;

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

        // Set an interval to fetch the block count every 5 seconds
        const intervalId = setInterval(getLatestBlocks, 5000);

        // Cleanup the interval when the component is destroyed
        return () => {
            clearInterval(intervalId);
        };
    });
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
    <div class="w-full max-w-screen-lg flex justify-between mb-6">
        {#each blocks as block (block.blockNumber)}
            <Block blockNumber={block.blockNumber} blockDate={block.blockDate} txCount={block.txCount} />
        {/each}
    </div>
</div>
