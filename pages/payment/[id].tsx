import ErrorVisualizer from "@/components/ErrorVisualizer";
import PaymentInformation from "@/components/payment/PaymentInformation";
import PaymentSummary from "@/components/payment/PaymentSummary";
import PaymentRejected from "@/components/payment/results/PaymentRejected";
import PaymentSucceded from "@/components/payment/results/PaymentSucceded";
import usePaymentStatus from "@/hooks/usePaymentStatus";
import { getCurrencies, getPaymentInfo } from "@/lib/api";
import { ICurrency, IPayment } from "@/types";
import { GetServerSidePropsContext } from "next";

export interface IPaymentConfirmationPage {
  paymentInfo: IPayment;
  currency: ICurrency;
  error?: string;
}

export default function PaymentConfirmationPage({ paymentInfo, currency, error }: IPaymentConfirmationPage) {
  const { paymentStatus } = usePaymentStatus(paymentInfo.identifier, paymentInfo.status);

  if (error) return <ErrorVisualizer errorMessage={error} />;
  if (paymentStatus === "CO" || paymentStatus === "AC") return <PaymentSucceded />;
  if (paymentStatus === "EX" || paymentStatus === "OC" || paymentStatus === "CA") return <PaymentRejected />;

  return (
    <div className="flex flex-col sm:flex-row w-full gap-6">
      <div className="sm:w-1/2">
        <PaymentSummary paymentInfo={paymentInfo} currency={currency} />
      </div>
      <div className="sm:w-1/2">
        <PaymentInformation paymentInfo={paymentInfo} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const paymentId = context.query.id;

    if (!paymentId || typeof paymentId != "string") throw new Error(`Invalid or missing payment identifier`);

    // The currencies api call can be cached to get a faster page load, using redis for example
    const currencies = await getCurrencies();
    const paymentInfo = await getPaymentInfo(paymentId);
    // Get currency of this payment
    const currency = currencies.find((currency) => currency.symbol === paymentInfo.currency_id);

    return { props: { paymentInfo, currency } };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load payment." } };
  }
};
