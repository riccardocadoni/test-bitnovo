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
