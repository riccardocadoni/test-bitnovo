import MakePayment from "@/components/MakePayment";
import OrderSummary from "@/components/OrderSummary";
import useNotificationSocket from "@/hooks/useNotificationSocket";
import { getCurrencies, getOrderInfo } from "@/lib/api";
import { ICurrency, IOrder } from "@/types";
import { GetServerSidePropsContext } from "next";

export interface IOrderPage {
  orderInfo: IOrder;
  currencies: ICurrency[];
  error?: string;
}

export default function OrderPage({ orderInfo, currencies, error }: IOrderPage) {
  const socket = useNotificationSocket(`wss://payments.pre-bnvo.com/ws/${orderInfo.identifier}`);

  if (error) return <div>{error}</div>;
  const selectedCurrency = currencies.find((currency) => currency.symbol === orderInfo.currency_id);

  return (
    <div className="flex flex-col sm:flex-row w-full gap-6">
      <div className="sm:w-1/2">
        <OrderSummary orderInfo={orderInfo} currency={selectedCurrency} />
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
    return { props: { orderInfo, currencies } };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load order." } };
  }
};
