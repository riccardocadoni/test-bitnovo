import useCountdownTimer from "@/hooks/useCountdownTimer";
import Timer from "./icons/Timer";

export interface ITimerVisualizer {
  expirationDate: string;
}

export default function TimerVisulizer({ expirationDate }: ITimerVisualizer) {
  const timeLeft = useCountdownTimer(expirationDate);
  return (
    <div className="flex flex-row gap-1 items-center">
      <Timer className="h-6 w-6" />
      <p className="text-xs mt-0">{timeLeft}</p>
    </div>
  );
}
