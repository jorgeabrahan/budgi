export default class UtilFormat {
  static name(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
