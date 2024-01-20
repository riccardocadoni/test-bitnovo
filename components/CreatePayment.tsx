import { ICurrency } from "@/types/index";
import CreatePaymentForm from "./CreatePaymentForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface ICreatePayment {
  currencies: ICurrency[];
}

export default function CreatePayment({ currencies }: ICreatePayment) {
  return (
    <Card className="sm:w-[600px] mt-10">
      <CardHeader className="flex items-center space-y-1">
        <CardTitle className="text-3xl">Crear pago </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CreatePaymentForm currencies={currencies} />
      </CardContent>
    </Card>
  );
}
