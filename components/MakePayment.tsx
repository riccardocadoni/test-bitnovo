import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import Timer from "./icons/Timer";
import Copy from "./icons/Copy";
import Warning2 from "./icons/Warning2";
import { IOrder } from "@/types";

export interface IMakePayment {
  orderInfo: IOrder;
}

export default function MakePayment({ orderInfo }: IMakePayment) {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Label className="text-xl">Realiza el pago</Label>
      <Card className="flex flex-col items-center gap-8">
        <CardHeader className="flex flex-row gap-1 items-center">
          <Timer className="h-6 w-6" />
          <p className="text-xs mt-0">05:08</p>
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
              <div className="flex justify-center items-center">QRCODE</div>
            </TabsContent>
            <TabsContent value="Web3"> implement web3 </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex w-full justify-center gap-2 items-center">
            <p className="text-sm font-semibold">Enviar</p>{" "}
            <p className="text-base font-bold">{`${orderInfo.crypto_amount} ${orderInfo.currency_id}`}</p>
            <Copy className="h-4 w-4" />
          </div>
          <div className="flex w-full justify-center gap-2 items-center">
            <p className="text-sm font-normal">{orderInfo.address}</p> <Copy className="h-4 w-4" />
          </div>
          <div className="flex w-full justify-center gap-2 items-center">
            <Warning2 className="h-6 w-6" />
            <p className="text-xs font-semibold">Etiqueta de destino: {orderInfo.tag_memo}</p>{" "}
            <Copy className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
