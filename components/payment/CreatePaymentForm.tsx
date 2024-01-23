import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ICurrency } from "@/types";
import CurrencyVisualizer from "../CurrencyVisualizer";
import { cn } from "@/lib/utils";
import { createPayment } from "@/lib/api";
import { useState } from "react";
import Spinner from "../loading/Spinner";
import { useRouter } from "next/router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Info from "../icons/Info";
import Arrow from "../icons/Arrow";

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
      amountPayable: z.string(),
      currency: z.string({
        required_error: "Por favor, seleccione una moneda.",
      }),
      paymentDescription: z
        .string()
        .max(30, {
          message: "El concepto no debe tener más de 30 caracteres.",
        })
        .optional(),
    })
    .refine(
      (data) => {
        const selectedCurrency = currencies.find((currency) => currency.symbol === data.currency);
        if (selectedCurrency) {
          const minAmount = Number(selectedCurrency.min_amount);
          const maxAmount = Number(selectedCurrency.max_amount);
          const amount = Number(data.amountPayable);
          return amount >= minAmount && amount <= maxAmount;
        }
        return false;
      },
      (data) => {
        const selectedCurrency = currencies.find((currency) => currency.symbol === data.currency);
        return {
          message: selectedCurrency
            ? `El importe debe estar entre ${selectedCurrency.min_amount} y ${selectedCurrency.max_amount}`
            : "Invalid currency selection",
          path: ["amountPayable"],
        };
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountPayable: "",
      currency: currencies[0]?.symbol,
      paymentDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        expectedOutputAmount: Number(values.amountPayable),
        inputCurrency: values.currency,
        notes: values.paymentDescription,
      };
      const response = await createPayment(payload);
      // Redirect to the payment page
      router.push(`/payment/${response.identifier}`);
    } catch (error) {
      console.error("Error creating payment:", error);
      setError("An error occurred while creating payment.");
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
              <div className="flex items-center gap-1">
                <FormLabel>Seleccionar moneda</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Info className="h-3.5 w-3.5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Selecciona una moneda</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormControl>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("justify-between py-[18px]", !field.value && "text-muted-foreground")}
                      >
                        <CurrencyVisualizer currency={currencies.find((currency) => currency.symbol === field.value)} />
                        <Arrow className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-content-width-same-as-its-trigger p-3 pb-1 sm:pb-3">
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
        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continuar
        </Button>
      </form>
    </Form>
  );
}
