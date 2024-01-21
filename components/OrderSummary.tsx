import { ICurrency, IOrder } from "@/types";
import Verify from "./icons/Verify";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export interface IOrderSummary {
  orderInfo: IOrder;
  currency?: ICurrency;
}

export default function OrderSummary({ orderInfo, currency }: IOrderSummary) {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Label className="text-xl">Resumen del pedido</Label>
      <Card className="bg-secondary border-0 shadow-none">
        <CardContent className="flex flex-col p-8 gap-8">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Importe:</p>
            <p className="text-lg font-bold">{`${orderInfo.fiat_amount} ${orderInfo.fiat}`}</p>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">Moneda seleccionada:</p>
            <div className="flex items-center gap-2.5">
              {currency?.image && <Image src={currency.image} alt="Currency logo" height={20} width={20} />}
              <p className="text-base font-bold">{orderInfo.currency_id}</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-bold">Comercio:</p>
            </div>
            <div className="flex justify-center items-center">
              <Verify className="h-6 w-6" />
              <p className="text-base">{`${orderInfo.merchant_device}`}</p> {/* Comercio de pruebas de */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">Fecha:</p>
            <p className="text-base">{formatDate(orderInfo.created_at)}</p>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">Concepto:</p>
            <p className="text-base">{orderInfo.notes && orderInfo.notes !== "undefined" ? orderInfo.notes : "-"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
