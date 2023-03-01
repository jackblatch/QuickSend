export default function formatClasses(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
