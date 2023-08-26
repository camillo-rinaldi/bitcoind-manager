const fetchFromBitcoind = async (rpcBody: any) => {
	const response = await fetch('/api/bitcoind', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rpcBody)
	});
	return await response.json();
};

export const getBlockCount = async (): Promise<number> => {
	const rpcBody = {
		jsonrpc: '1.0',
		id: 'test',
		method: 'getblockcount',
		params: []
	};
	const data = await fetchFromBitcoind(rpcBody);
	return data.result;
};

export const getBlockDetails = async (blockNumber: number) => {
	// First, get the block hash for the given block number
	const hashRpcBody = {
		jsonrpc: '1.0',
		id: 'test',
		method: 'getblockhash',
		params: [blockNumber]
	};
	const hashData = await fetchFromBitcoind(hashRpcBody);
	const blockHash = hashData.result;

	// Now, get the block details using the block hash
	const blockRpcBody = {
		jsonrpc: '1.0',
		id: 'test',
		method: 'getblock',
		params: [blockHash, 1] // Using verbosity level 1
	};
	const blockData = await fetchFromBitcoind(blockRpcBody);
	const blockDate = new Date(blockData.result.time * 1000).toLocaleDateString();
	const txCount = blockData.result.tx.length;

	return { blockDate, txCount };
};
