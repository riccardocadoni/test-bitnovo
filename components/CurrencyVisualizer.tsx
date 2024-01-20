import { ICurrency } from "@/types/index";
import Image from "next/image";
import TickCircle from "./icons/TickCircle";
import { ChevronDown } from "lucide-react";

export default function CurrencyVisualizer({
  currency,
  isInList = false,
  isSelected = false,
}: {
  currency?: ICurrency;
  isInList?: boolean;
  isSelected?: boolean;
}) {
  if (!currency) return "Seleccionar moneda";
  const { image, name, symbol } = currency;
  if (isInList)
    return (
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <Image src={image} alt="Currency logo" height={32} width={32} />
          <div>
            <p className="text-[14px] font-bold">{name}</p>
            <p className="text-[12px]">{symbol}</p>
          </div>
        </div>
        {isSelected ? (
          <TickCircle className="h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 -rotate-90" />
        )}
      </div>
    );
  return (
    <div className="flex items-center gap-2">
      <Image src={image} alt="Currency logo" height={24} width={24} />
      <p className="text-sm">{name}</p>
    </div>
  );
}
