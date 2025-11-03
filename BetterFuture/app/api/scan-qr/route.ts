import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const qrDataSchema = z.object({
  address: z.string().describe('Ethereum address extracted from QR code'),
  amount: z.string().describe('Amount to send in ETH'),
  valid: z
    .boolean()
    .describe('Whether the QR code contains valid address and amount'),
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Extract base64 data from data URL
    const base64Data = image.split(',')[1] || image;

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-exp'),
      schema: qrDataSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Scan this QR code and extract the Ethereum address and amount to send. Return the address and amount as a valid JSON object. If you cannot extract valid data, set valid to false and describe the issue.',
            },
            {
              type: 'image',
              image: base64Data,
            },
          ],
        },
      ],
    });

    return Response.json(object);
  } catch (error) {
    console.error('Error scanning QR code:', error);
    return Response.json({ error: 'Failed to scan QR code' }, { status: 500 });
  }
}
