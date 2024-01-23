import { QRCodeSVG } from "qrcode.react";
import { createCryptoUriForQRcode } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export interface IQRCodeVisualizer {
  currencyId: string;
  address: string;
  cryptoAmount: number;
  tagMemo?: string;
}

export default function QRCodeVisualizer({ currencyId, address, cryptoAmount, tagMemo }: IQRCodeVisualizer) {
  const uriQRcode = createCryptoUriForQRcode(currencyId, address, cryptoAmount, tagMemo);

  if (!uriQRcode) {
    return (
      <Card>
        <CardContent className="flex text-center justify-center items-center p-4 w-32 h-32">
          <p>Error generating QR Code</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <QRCodeSVG value={uriQRcode} />
      </CardContent>
    </Card>
  );
}
