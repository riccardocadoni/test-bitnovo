import useMetamask from "@/hooks/useMetamask";
import { Button } from "./ui/button";
import Spinner from "./loading/Spinner";

export interface IWeb3Payment {
  address: string;
  amount: number;
}

const Web3Payment = ({ address, amount }: IWeb3Payment) => {
  const { account, isMetamaskInstalled, connectWallet, sendPayment, isLoading, isTransactionStarted, error } =
    useMetamask(address, amount);

  if (!isMetamaskInstalled) return <p>Por favor, instale Metamask.</p>;
  if (error) return <p className="text-destructive">{error}</p>;
  if (isTransactionStarted) return <p>¡Genial! Transacción iniciada.</p>;

  return (
    <div>
      {!account ? (
        <Button size="sm" onClick={connectWallet} disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Conéctese a MetaMask
        </Button>
      ) : (
        <Button size="sm" onClick={sendPayment} disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Pagar con MetaMask
        </Button>
      )}
    </div>
  );
};

export default Web3Payment;
