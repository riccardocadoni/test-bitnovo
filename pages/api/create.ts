import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { expected_output_amount, input_currency, notes } = req.body;

      const formData = new FormData();

      formData.append("expected_output_amount", expected_output_amount);
      formData.append("input_currency", input_currency);
      formData.append("notes", notes);

      const response = await fetch(`${process.env.API_BASE_URL}/orders/`, {
        method: "POST",
        headers: {
          "X-Device-Id": process.env.X_DEVICE_ID!,
        },
        body: formData,
      });

      if (!response.ok) {
        console.log(`Error in POST request, status: ${response.status}`);
        throw new Error(`Error in POST request, status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).json({ error: "Error processing request" });
    }
  } else {
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
