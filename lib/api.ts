import { ICurrency } from "@/types";

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

export const getOrderInfo = async (orderId: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/orders/info/${orderId}`, {
      headers: {
        "X-Device-Id": process.env.X_DEVICE_ID!,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch order info - status: ${res.status}`);
    }
    const orderInfo = await res.json();
    return orderInfo;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async ({
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
      throw new Error(`Failed to create order - status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
