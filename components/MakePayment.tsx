import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import Copy from "./icons/Copy";
import Warning2 from "./icons/Warning2";
import { IOrder } from "@/types";
import { Button } from "./ui/button";
import { handleCopyClick } from "@/lib/utils";
import TimerVisulizer from "./TimerVisulizer";
import QRCodeVisualizer from "./QRCodeVisualizer";

export interface IMakePayment {
  orderInfo: IOrder;
}

export default function MakePayment({ orderInfo }: IMakePayment) {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Label className="text-xl">Realiza el pago</Label>
      <Card className="flex flex-col items-center">
        <CardHeader>
          <TimerVisulizer expirationDate={orderInfo.expired_time} />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="SmartQR" className="">
            <TabsList className="grid w-full gap-4 grid-cols-2 bg-transparent">
              <TabsTrigger
                className="rounded-2xl bg-accent data-[state=active]:bg-primary data-[state=active]:text-white"
                value="SmartQR"
              >
                Smart QR
              </TabsTrigger>
              <TabsTrigger
                className="rounded-2xl bg-accent data-[state=active]:bg-primary data-[state=active]:text-white"
                value="Web3"
              >
                Web 3
              </TabsTrigger>
            </TabsList>
            <TabsContent value="SmartQR">
              <div className="flex justify-center items-center">
                <QRCodeVisualizer
                  currencyId={orderInfo.currency_id}
                  address={orderInfo.address}
                  cryptoAmount={orderInfo.crypto_amount}
                  tagMemo={orderInfo.tag_memo}
                />
              </div>
            </TabsContent>
            <TabsContent value="Web3">
              <Card>
                <CardContent className="flex text-center justify-center items-center p-4 w-40 h-40">
                  <p>Connect wallet</p>
                </CardContent>
              </Card>{" "}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex w-full justify-center gap-2 items-center">
            <p className="text-sm font-semibold">Enviar</p>{" "}
            <p className="text-base font-bold">{`${orderInfo.crypto_amount} ${orderInfo.currency_id}`}</p>
            <Button
              variant="ghost"
              className="p-2 h-8"
              onClick={() => handleCopyClick(orderInfo.crypto_amount.toString())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full justify-center gap-2 items-center">
            <p className="break-all text-sm font-normal">{orderInfo.address}</p>
            <Button variant="ghost" className="p-2 h-8" onClick={() => handleCopyClick(orderInfo.address)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full justify-center gap-2 items-center">
            <Warning2 className="h-6 w-6" />
            <p className="text-xs font-semibold">Etiqueta de destino: {orderInfo.tag_memo}</p>
            {orderInfo.tag_memo ? (
              <Button variant="ghost" className="p-2 h-8" onClick={() => handleCopyClick(orderInfo.tag_memo)}>
                <Copy className="h-4 w-4" />
              </Button>
            ) : (
              "-"
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
