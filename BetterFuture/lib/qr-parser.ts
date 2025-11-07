// Parse QR code data for payment information
export interface QRPaymentData {
  address: string;
  amount: string;
  valid: boolean;
  error?: string;
}

export function parseQRData(qrText: string): QRPaymentData {
  try {
    // Handle ethereum: URI format
    if (qrText.startsWith('ethereum:')) {
      return parseEthereumURI(qrText);
    }
    
    // Handle JSON format
    if (qrText.startsWith('{')) {
      return parseJSONFormat(qrText);
    }
    
    // Handle simple address:amount format
    if (qrText.includes(':') && qrText.includes('@')) {
      return parseSimpleFormat(qrText);
    }
    
    return {
      address: '',
      amount: '',
      valid: false,
      error: 'Unsupported QR format'
    };
  } catch (error) {
    return {
      address: '',
      amount: '',
      valid: false,
      error: 'Failed to parse QR code'
    };
  }
}

function parseEthereumURI(uri: string): QRPaymentData {
  // Format: ethereum:[address]@[chainId]?value=[amount]
  const match = uri.match(/ethereum:([^@]+)@(\d+)\?value=([^&]+)/);
  
  if (match) {
    const [, address, chainId, amount] = match;
    return {
      address: address.trim(),
      amount: amount.trim(),
      valid: isValidAddress(address) && isValidAmount(amount),
    };
  }
  
  return {
    address: '',
    amount: '',
    valid: false,
    error: 'Invalid ethereum URI format'
  };
}

function parseJSONFormat(jsonText: string): QRPaymentData {
  try {
    const data = JSON.parse(jsonText);
    return {
      address: data.address || '',
      amount: data.amount || '',
      valid: isValidAddress(data.address) && isValidAmount(data.amount),
    };
  } catch {
    return {
      address: '',
      amount: '',
      valid: false,
      error: 'Invalid JSON format'
    };
  }
}

function parseSimpleFormat(text: string): QRPaymentData {
  // Handle formats like "address:amount@chainId"
  const parts = text.split('@')[0].split(':');
  if (parts.length >= 2) {
    const address = parts[0].trim();
    const amount = parts[1].trim();
    return {
      address,
      amount,
      valid: isValidAddress(address) && isValidAmount(amount),
    };
  }
  
  return {
    address: '',
    amount: '',
    valid: false,
    error: 'Invalid format'
  };
}

function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function isValidAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}