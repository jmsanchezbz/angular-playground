export default class Utils {
  
  static encode(str: string): string {
    return Utils.bytesToBase64(new TextEncoder().encode(str));
  }

  static decode(base64: string): string {
    return new TextDecoder().decode(Utils.base64ToBytes(base64));
  }

  static base64ToBytes(base64: string): Uint8Array {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) as number);
  }

  static bytesToBase64(bytes: Uint8Array): string {
    const binString = Array.from(bytes, (byte) =>
      String.fromCodePoint(byte)
    ).join("");
    return btoa(binString);
  }
}
