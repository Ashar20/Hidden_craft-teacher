import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';

const DAO_ADDRESS = '0x000000000000000000000000000000000000dead'; // Replace with your DAO address

export default function Home() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('0.01');
  const { sendTransaction, isLoading, isSuccess, data } = useSendTransaction();

  const handleDonate = () => {
    sendTransaction({
      to: DAO_ADDRESS,
      value: parseEther(amount),
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fdf6ec' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Hidden Craft Teach</h1>
      <ConnectButton />
      {isConnected && (
        <div style={{ marginTop: 32, background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
          <h2>Donate to DAO</h2>
          <input
            type="number"
            min="0.001"
            step="0.001"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ marginRight: 8, padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button
            onClick={handleDonate}
            disabled={isLoading}
            style={{ padding: '8px 16px', background: '#1677ff', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600 }}
          >
            {isLoading ? 'Processing...' : 'Donate'}
          </button>
          {isSuccess && (
            <div style={{ marginTop: 12 }}>
              <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1677ff' }}>
                View Transaction
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 