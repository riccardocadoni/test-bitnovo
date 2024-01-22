import ErrorVisualizer from "@/components/ErrorVisualizer";
import MakePayment from "@/components/MakePayment";
import OrderSummary from "@/components/OrderSummary";
import PaymentRejected from "@/components/PaymentRejected";
import PaymentSucceded from "@/components/PaymentSucceded";
import usePaymentStatus from "@/hooks/usePaymentStatus";
import { getCurrencies, getOrderInfo } from "@/lib/api";
import { ICurrency, IOrder } from "@/types";
import { GetServerSidePropsContext } from "next";

export interface IOrderPage {
  orderInfo: IOrder;
  currency: ICurrency;
  error?: string;
}

export default function OrderPage({ orderInfo, currency, error }: IOrderPage) {
  const { paymentStatus } = usePaymentStatus(orderInfo.identifier, orderInfo.status);

  if (error) return <ErrorVisualizer errorMessage={error} />;
  if (paymentStatus === "CO" || paymentStatus === "AC") return <PaymentSucceded />;
  if (paymentStatus === "EX" || paymentStatus === "OC" || paymentStatus === "CA") return <PaymentRejected />;

  return (
    <div className="flex flex-col sm:flex-row w-full gap-6">
      <div className="sm:w-1/2">
        <OrderSummary orderInfo={orderInfo} currency={currency} />
      </div>
      <div className="sm:w-1/2">
        <MakePayment orderInfo={orderInfo} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const orderId = context.query.id;

    if (!orderId || typeof orderId != "string") throw new Error(`Invalid or missing order identifier`);

    // The currencies api call can be cached to get a faster page load, using redis for example
    const currencies = await getCurrencies();
    const orderInfo = await getOrderInfo(orderId);
    // Get currency of this order
    const currency = currencies.find((currency) => currency.symbol === orderInfo.currency_id);

    return { props: { orderInfo, currency } };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load order." } };
  }
};
