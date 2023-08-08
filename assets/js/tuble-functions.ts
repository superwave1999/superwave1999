import {NO_CONNECTION} from "assets/js/tuble-block";

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

  public static connectionToCoords(connection: number, currentX:number, currentY: number): [number, number] {
    let coords: [number, number] = [NO_CONNECTION, NO_CONNECTION]
    switch (connection) {
      case 3: //To left.
        coords = [currentX - 1, currentY]
        break
      case 2: //TO bottom.
        coords = [currentX, currentY + 1]
        break
      case 1:
        coords = [currentX + 1, currentY]
        break
      case 0:
        coords = [currentX, currentY - 1]
        break
    }
    return coords
  }

  public static includesArray(needle: [number, number], haystack: [number, number][]) {

  }
}
