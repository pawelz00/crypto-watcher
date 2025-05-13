interface CryptoConversion {
  smallestUnit: string;
  conversionFactor: number | bigint;
}

export const CRYPTO_CONVERSIONS: Record<string, CryptoConversion> = {
  BTC: {
    smallestUnit: "satoshi",
    conversionFactor: 100000000,
  },
  ETH: {
    smallestUnit: "wei",
    conversionFactor: 1000000000000000000n,
  },
  POL: {
    smallestUnit: "wei",
    conversionFactor: 1000000000000000000n,
  },
  DOT: {
    smallestUnit: "planck",
    conversionFactor: 10000000000,
  },
  SOL: {
    smallestUnit: "lamport",
    conversionFactor: 1000000000,
  },
};

export function convertToMainUnit(
  amount: number,
  cryptoId: string
): number | null {
  const conversion = CRYPTO_CONVERSIONS[cryptoId.toUpperCase()];

  if (!conversion) return null;

  return amount / Number(conversion.conversionFactor);
}

export function formatCryptoAmount(amount: number): string {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
}
