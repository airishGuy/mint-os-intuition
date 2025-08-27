import { createConfig, http } from 'wagmi';
import type { Chain } from 'viem';



const intuitionTestnet = {
    id: 13579,
    name: 'Intuition Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Intuition Testnet',
        symbol: 'tTRUST',
    },
    rpcUrls: {
        public: {
            http: ['https://testnet.rpc.intuition.systems/http'],
        },
        default: {
            http: ['https://testnet.rpc.intuition.systems/http'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Intuition Testnet',
            url: 'https://testnet.explorer.intuition.systems/',
        },
    },

    testnet: true,
} as const satisfies Chain;

export const wagmiConfig = createConfig({
    chains: [
        intuitionTestnet,
    ],
    transports: {
        [intuitionTestnet.id]: http(),
    },
});