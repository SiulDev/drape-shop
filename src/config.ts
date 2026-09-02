export const WHATSAPP_NUMBER = "584123401963";

export const getBcvRate = () => {
  const value = Number(
    import.meta.env.PUBLIC_BCV_RATE ??
      import.meta.env.BCV_RATE ??
      145.32,
  );

  return Number.isFinite(value) && value > 0 ? value : 145.32;
};

export const BS_RATE = getBcvRate();

export const SITE = {
  name: "DRAPE",
  tagline: "Piezas originales, directo a tu clóset.",
};
