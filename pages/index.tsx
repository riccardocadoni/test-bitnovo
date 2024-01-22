import CreatePayment from "@/components/payment/CreatePayment";
import ErrorVisualizer from "@/components/ErrorVisualizer";
import { getCurrencies } from "@/lib/api";
import { ICurrency } from "@/types/index";

export interface ICreatePaymentPage {
  currencies: ICurrency[];
  error?: string;
}

export default function CreatePaymentPage({ currencies, error }: ICreatePaymentPage) {
  if (error) return <ErrorVisualizer errorMessage={error} />;
  return (
    <div className="flex justify-center items-center w-full sm:max-w-2xl">
      <CreatePayment currencies={currencies} />
    </div>
  );
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
