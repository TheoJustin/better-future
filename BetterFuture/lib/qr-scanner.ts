// QR Code scanning using jsQR library
import jsQR from 'jsqr';

export async function scanQRFromImage(imageFile: File): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        resolve(code?.data || null);
      } else {
        resolve(null);
      }
    };
    
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(imageFile);
  });
}