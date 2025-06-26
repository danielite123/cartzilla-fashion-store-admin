import { CartIcon } from "../icons";

export default function AppLogo() {
  return (
    <div className="flex flex-row items-center font-display text-ocean-green">
      <CartIcon />
      <p className="text-xl font-semibold italic">Zilla</p>
    </div>
  );
}
