import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  connectWallet as connectWalletUtil, 
  getAccounts, 
  isMetaMaskAvailable,
  onAccountsChanged,
  onChainChanged,
  removeAccountsChangedListener,
  removeChainChangedListener
} from "@/lib/blockchain";

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();

    // Set up event listeners
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setIsConnected(false);
        setWalletAddress(null);
        toast({
          title: "Wallet desconectado",
          description: "Su wallet ha sido desconectado",
        });
      } else {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
      }
    };

    const handleChainChanged = (chainId: string) => {
      // Reload page when chain changes to avoid issues
      window.location.reload();
    };

    onAccountsChanged(handleAccountsChanged);
    onChainChanged(handleChainChanged);

    // Cleanup
    return () => {
      removeAccountsChangedListener(handleAccountsChanged);
      removeChainChangedListener(handleChainChanged);
    };
  }, [toast]);

  const connectWallet = async () => {
    if (!isMetaMaskAvailable()) {
      toast({
        title: "MetaMask no disponible",
        description: "Por favor instale MetaMask para conectar su wallet",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await connectWalletUtil();
      setIsConnected(true);
      setWalletAddress(accounts[0]);
      toast({
        title: "Wallet conectado",
        description: "Su wallet se ha conectado exitosamente",
      });
    } catch (error: any) {
      toast({
        title: "Error de conexión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isConnected,
    walletAddress,
    isConnecting,
    connectWallet,
    isMetaMaskAvailable: isMetaMaskAvailable(),
  };
}
