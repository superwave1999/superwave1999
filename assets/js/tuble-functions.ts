import equal from "array-equal";

export default class TubleFunctions {
  public static async newHash(message: string): Promise<number[]> {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgUint8); // hash the message
    return Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  }

  public static overflow(max: number, num: number) {
    let n = 0;
    for (let i = 0; i < num; i++) {
      if (n + 1 > max) {
        n = 0;
      } else {
        n++;
      }
    }
    return n;
  }

  public static includesArray(
    needle: [number, number],
    haystack: [number, number][]
  ) {
    return haystack.findIndex((coords) => equal(coords, needle)) !== -1;
  }
}
