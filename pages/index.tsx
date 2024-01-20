import CreatePayment from "@/components/CreatePayment";
import { getCurrencies } from "@/lib/api";
import { ICurrency } from "@/types/index";

export interface IHome {
  currencies: ICurrency[];
  error?: string;
}

export default function Home({ currencies, error }: IHome) {
  if (error) return <div>{error}</div>;
  return <CreatePayment currencies={currencies} />;
}

export const getServerSideProps = async () => {
  try {
    const currencies = await getCurrencies();
    return { props: { currencies } };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load currencies." } };
  }
};
