import CreatePayment from "@/components/CreatePayment";
import ErrorVisualizer from "@/components/ErrorVisualizer";
import { getCurrencies } from "@/lib/api";
import { ICurrency } from "@/types/index";

export interface IHome {
  currencies: ICurrency[];
  error?: string;
}

export default function Home({ currencies, error }: IHome) {
  if (error) return <ErrorVisualizer errorMessage={error} />;
  return <CreatePayment currencies={currencies} />;
}

export const getStaticProps = async () => {
  try {
    const currencies = await getCurrencies();
    return {
      props: { currencies },
      /*  
          Set the revalidation time to 1 hour (3600 seconds).
          If the currencies values do not have frequent updates, On-Demand Revalidation could be implemented to revalidate the data only when necessary.
      */
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load currencies." } };
  }
};
