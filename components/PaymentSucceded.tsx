import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Succeded from "./icons/Succeded";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./loading/Spinner";

export interface IPaymentSucceded {}

export default function PaymentSucceded({}: IPaymentSucceded) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-8 gap-4 max-w-md text-center">
        <Succeded className="h-20 w-20" />
        <p className="font-bold text-xl">¡Pago completado!</p>
        <p className="font-normal text-base">
          Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius dolor elit facilisi enim. Nulla ut ut
          eu nunc.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setIsLoading(true);
            router.push("/");
          }}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Crear nuevo pago
        </Button>
      </CardFooter>
    </Card>
  );
}
