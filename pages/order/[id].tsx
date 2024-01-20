import { getOrderInfo } from "@/lib/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export interface IOrderPage {
  orderInfo: any;
  error?: string;
}

export default function OrderPage({ orderInfo, error }: IOrderPage) {
  const router = useRouter();
  if (error) return <div>{error}</div>;
  return <div>order info: {JSON.stringify(orderInfo)}</div>;
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
