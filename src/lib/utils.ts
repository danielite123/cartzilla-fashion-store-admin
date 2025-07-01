export function cn(
  ...inputs: (string | number | null | undefined | false)[]
): string {
  return inputs.filter(Boolean).join(" ");
}
