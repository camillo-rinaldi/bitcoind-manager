<script lang="ts">
    export let blockNumber: number;
    export let blockDate: string;
    export let txCount: number;
</script>

<div class="bg-gray-200 p-6 shadow-md rounded-l">
    <p class="font-bold">Block: {blockNumber}</p>
    <p>Date: {blockDate}</p>
    <p>Transactions: {txCount}</p>
</div>
