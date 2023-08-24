<script>
    let blockCount;

    async function getBlockCount() {
        const rpcBody = {
            jsonrpc: "1.0",
            id: "test",
            method: "getblockcount",
            params: []
        };

        const response = await fetch('/api/bitcoind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rpcBody)
        });

        const data = await response.json();

        console.log(data);

        blockCount = data.result;
    }
</script>

<button on:click={getBlockCount}>Get Block Count</button>
<p>Block Count: {blockCount}</p>
