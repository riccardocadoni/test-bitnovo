import Logo from "./icons/Logo";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="flex gap-4 items-center h-6">
      <Logo />
      <Separator orientation="vertical" />
      <p className="text-border text-xs font-bold">© 2022 Bitnovo. All rights reserved.</p>
    </footer>
  );
}
