import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICurrency } from "@/types";

export interface ICreatePaymentForm {
  currencies: ICurrency[];
}

export default function CreatePaymentForm({ currencies }: ICreatePaymentForm) {
  const formSchema = z.object({
    amountPayable: z.coerce.number().min(0, "Amount must be a positive number"),
    currency: z.string({
      required_error: "Please select a currency.",
    }),
    paymentDescription: z
      .string()
      .min(2, {
        message: "Description must be at least 2 characters.",
      })
      .max(30, {
        message: "Description must not be longer than 30 characters.",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountPayable: 0,
    },
  });

  console.log(currencies);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    /* todo */
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amountPayable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importe a pagar</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Añade importe a pagar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Seleccionar moneda</FormLabel>
              {/* todo */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concepto</FormLabel>
              <FormControl>
                <Input placeholder="Añade descripción del pago" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continuar
        </Button>
      </form>
    </Form>
  );
}
