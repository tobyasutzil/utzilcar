// Blockchain utilities for MetaMask integration and smart contract interactions

export interface WalletProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: WalletProvider;
  }
}

export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
};

export const connectWallet = async (): Promise<string[]> => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask no está instalado. Por favor instale MetaMask para continuar.');
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    });
    return accounts;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Usuario rechazó la conexión a MetaMask');
    }
    throw new Error('Error al conectar con MetaMask: ' + error.message);
  }
};

export const getAccounts = async (): Promise<string[]> => {
  if (!isMetaMaskAvailable()) {
    return [];
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_accounts',
    });
    return accounts;
  } catch (error) {
    console.error('Error getting accounts:', error);
    return [];
  }
};

export const switchToEthereumMainnet = async (): Promise<void> => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask no está disponible');
  }

  try {
    await window.ethereum!.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }], // Ethereum Mainnet
    });
  } catch (error: any) {
    if (error.code === 4902) {
      // Chain not added to MetaMask
      throw new Error('Red Ethereum no está configurada en MetaMask');
    }
    throw error;
  }
};

export const addEthereumNetwork = async (): Promise<void> => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask no está disponible');
  }

  try {
    await window.ethereum!.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x1',
          chainName: 'Ethereum Mainnet',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://mainnet.infura.io/v3/'],
          blockExplorerUrls: ['https://etherscan.io/'],
        },
      ],
    });
  } catch (error) {
    throw new Error('Error al agregar la red Ethereum');
  }
};

// Simulated smart contract interactions for MVP
export const registerVehicleNFT = async (vehicleData: any): Promise<string> => {
  // In a real implementation, this would interact with the smart contract
  // For now, we'll simulate the NFT creation
  return new Promise((resolve) => {
    setTimeout(() => {
      const nftId = Math.floor(Math.random() * 100000).toString();
      resolve(nftId);
    }, 2000);
  });
};

export const verifyVehicleNFT = async (nftId: string): Promise<boolean> => {
  // Simulate NFT verification
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

// Event listeners for wallet changes
export const onAccountsChanged = (callback: (accounts: string[]) => void): void => {
  if (isMetaMaskAvailable()) {
    window.ethereum!.on('accountsChanged', callback);
  }
};

export const onChainChanged = (callback: (chainId: string) => void): void => {
  if (isMetaMaskAvailable()) {
    window.ethereum!.on('chainChanged', callback);
  }
};

export const removeAccountsChangedListener = (callback: (accounts: string[]) => void): void => {
  if (isMetaMaskAvailable()) {
    window.ethereum!.removeListener('accountsChanged', callback);
  }
};

export const removeChainChangedListener = (callback: (chainId: string) => void): void => {
  if (isMetaMaskAvailable()) {
    window.ethereum!.removeListener('chainChanged', callback);
  }
};
