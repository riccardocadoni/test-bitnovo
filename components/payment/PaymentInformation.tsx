import dynamic from "next/dynamic";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "../ui/label";
import Copy from "../icons/Copy";
import Warning2 from "../icons/Warning2";
import { IPayment } from "@/types";
import { Button } from "../ui/button";
import { handleCopyClick } from "@/lib/utils";
import QRCodeVisualizer from "../QRCodeVisualizer";
//disabled SSR for this component to avoid error: Text content does not match server-rendered HTML
const TimerVisulizer = dynamic(() => import("../TimerVisulizer"), { ssr: false });

export interface IPaymentInformation {
  paymentInfo: IPayment;
}

export default function PaymentInformation({ paymentInfo }: IPaymentInformation) {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Label className="text-xl">Realiza el pago</Label>
      <Card className="flex flex-col items-center">
        <CardHeader>
          <TimerVisulizer expirationDate={paymentInfo.expired_time} />
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
                  currencyId={paymentInfo.currency_id}
                  address={paymentInfo.address}
                  cryptoAmount={paymentInfo.crypto_amount}
                  tagMemo={paymentInfo.tag_memo}
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
            <p className="text-base font-bold">{`${paymentInfo.crypto_amount} ${paymentInfo.currency_id}`}</p>
            <Button
              variant="ghost"
              className="p-2 h-8"
              onClick={() => handleCopyClick(paymentInfo.crypto_amount.toString())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full justify-center gap-2 items-center">
            <p className="break-all text-sm font-normal">{paymentInfo.address}</p>
            <Button variant="ghost" className="p-2 h-8" onClick={() => handleCopyClick(paymentInfo.address)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full justify-center gap-2 items-center">
            <Warning2 className="h-6 w-6" />
            <p className="text-xs font-semibold">Etiqueta de destino: {paymentInfo.tag_memo}</p>
            {paymentInfo.tag_memo ? (
              <Button variant="ghost" className="p-2 h-8" onClick={() => handleCopyClick(paymentInfo.tag_memo)}>
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
