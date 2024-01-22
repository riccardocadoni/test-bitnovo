import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ICurrency } from "@/types";
import CurrencyVisualizer from "./CurrencyVisualizer";
import { cn } from "@/lib/utils";
import { createOrder } from "@/lib/api";
import { useState } from "react";
import Spinner from "./loading/Spinner";
import { useRouter } from "next/router";

export interface ICreatePaymentForm {
  currencies: ICurrency[];
}

export default function CreatePaymentForm({ currencies }: ICreatePaymentForm) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const router = useRouter();

  const formSchema = z
    .object({
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
    })
    .refine(
      (data) => {
        const selectedCurrency = currencies.find((currency) => currency.symbol === data.currency);
        if (selectedCurrency) {
          const minAmount = Number(selectedCurrency.min_amount);
          const maxAmount = Number(selectedCurrency.max_amount);
          return data.amountPayable >= minAmount && data.amountPayable <= maxAmount;
        }
        return false;
      },
      {
        message: "Amount must be within the range of the selected currency",
        path: ["amountPayable"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountPayable: 0,
      currency: currencies[0]?.symbol,
      paymentDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        expectedOutputAmount: values.amountPayable,
        inputCurrency: values.currency,
        notes: values.paymentDescription,
      };
      const response = await createOrder(payload);
      // Redirect to the order page
      console.log(response);
      router.push(`/order/${response.identifier}`);
    } catch (error) {
      console.error("Error creating order:", error);
      setError("An error occurred while creating order.");
    } finally {
      setIsLoading(false);
    }
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
              <FormControl>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("justify-between border-border py-4", !field.value && "text-muted-foreground")}
                      >
                        <CurrencyVisualizer currency={currencies.find((currency) => currency.symbol === field.value)} />
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                    <Command>
                      <CommandInput placeholder="Buscar" />
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {currencies.map((currency) => (
                          <CommandItem
                            value={currency.name}
                            key={currency.symbol}
                            onSelect={() => {
                              form.setValue("currency", currency.symbol);
                              setIsPopoverOpen(false);
                            }}
                          >
                            <CurrencyVisualizer
                              currency={currency}
                              isInList
                              isSelected={field.value === currency.symbol}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
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
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continuar
        </Button>
      </form>
    </Form>
  );
}
