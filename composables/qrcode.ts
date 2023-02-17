import QRCode from "qrcode";
export function useQrCode(message: string, canvas: HTMLCanvasElement) {
  QRCode.toCanvas(canvas, message, { width: 300 });
}
