// Simple API that just parses QR text
function parseQRData(qrText: string) {
  try {
    // Handle ethereum: URI format
    if (qrText.startsWith('ethereum:')) {
      const match = qrText.match(/ethereum:([^@]+)@(\d+)\?value=([^&]+)/);
      if (match) {
        const [, address, chainId, amount] = match;
        return {
          address: address.trim(),
          amount: amount.trim(),
          valid: /^0x[a-fA-F0-9]{40}$/.test(address) && !isNaN(parseFloat(amount))
        };
      }
    }
    
    // Handle JSON format
    if (qrText.startsWith('{')) {
      const data = JSON.parse(qrText);
      return {
        address: data.address || '',
        amount: data.amount || '',
        valid: /^0x[a-fA-F0-9]{40}$/.test(data.address) && !isNaN(parseFloat(data.amount))
      };
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

export async function POST(req: Request) {
  try {
    const { qrText } = await req.json();

    if (!qrText) {
      return Response.json({ error: 'No QR text provided' }, { status: 400 });
    }
    
    // Parse the QR data
    const result = parseQRData(qrText);
    
    return Response.json(result);
  } catch (error) {
    console.error('Error parsing QR code:', error);
    return Response.json({ error: 'Failed to parse QR code' }, { status: 500 });
  }
}
