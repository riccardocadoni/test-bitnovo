import MakePayment from "@/components/MakePayment";
import OrderSummary from "@/components/OrderSummary";
import { getOrderInfo } from "@/lib/api";
import { IOrder } from "@/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export interface IOrderPage {
  orderInfo: IOrder;
  error?: string;
}

export default function OrderPage({ orderInfo, error }: IOrderPage) {
  const router = useRouter();
  if (error) return <div>{error}</div>;
  return (
    <div className="flex w-full gap-6">
      <div className="w-1/2">
        <OrderSummary orderInfo={orderInfo} />
      </div>
      <div className="w-1/2">
        <MakePayment orderInfo={orderInfo} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const orderId = context.query.id;
    if (!orderId || typeof orderId != "string") throw new Error(`Invalid or missing order identifier`);
    const orderInfo = await getOrderInfo(orderId);
    return { props: { orderInfo } };
  } catch (error) {
    console.error("Error: ", error);
    return { props: { error: "Failed to load order." } };
  }
};
