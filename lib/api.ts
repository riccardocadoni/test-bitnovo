import { ICurrency, IPayment } from "@/types";

export const getCurrencies = async (): Promise<ICurrency[]> => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/currencies`, {
      headers: {
        "X-Device-Id": process.env.X_DEVICE_ID!,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch currencies - status: ${res.status}`);
    }
    const currencies = await res.json();
    return currencies;
  } catch (error) {
    throw error;
  }
};

export const getPaymentInfo = async (paymentId: string): Promise<IPayment> => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/orders/info/${paymentId}`, {
      headers: {
        "X-Device-Id": process.env.X_DEVICE_ID!,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch payment info - status: ${res.status}`);
    }
    const paymentInfo = await res.json();
    return paymentInfo[0];
  } catch (error) {
    throw error;
  }
};

export const createPayment = async ({
  expectedOutputAmount,
  inputCurrency,
  notes,
}: {
  expectedOutputAmount: number;
  inputCurrency: string;
  notes?: string;
}): Promise<any> => {
  try {
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({
        expected_output_amount: expectedOutputAmount,
        input_currency: inputCurrency,
        notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment - status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
