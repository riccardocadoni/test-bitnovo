import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Rejected from "./icons/Rejected";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./loading/Spinner";

export interface IErrorVisualizer {
  errorMessage: string;
}

export default function ErrorVisualizer({ errorMessage }: IErrorVisualizer) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-8 gap-4 max-w-md text-center">
        <Rejected className="h-20 w-20" />
        <p className="font-bold text-xl">¡Ooops!</p>
        <p className="font-normal text-base">{errorMessage}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setIsLoading(true);
            router.reload();
          }}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Recarga la página
        </Button>
      </CardFooter>
    </Card>
  );
}
