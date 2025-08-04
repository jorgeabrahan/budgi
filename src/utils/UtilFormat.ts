export default class UtilFormat {
  static name(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  static currency(
    value: number,
    {
      locale,
      code,
      decimals,
    }: { locale: string; code: string; decimals: number }
  ): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
}
