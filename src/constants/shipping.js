export const FREE_SHIPPING_MINIMUM = 150000;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    title: "Envio estandar",
    description: "Llega entre 3 y 6 dias habiles.",
    cost: 6500,
  },
  {
    id: "express",
    title: "Envio express",
    description: "Llega entre 24 y 48 horas habiles.",
    cost: 12000,
  },
  {
    id: "pickup",
    title: "Retiro en sucursal",
    description: "Retiras sin costo por una sucursal disponible.",
    cost: 0,
  },
];

export function getShippingOption(optionId) {
  return (
    SHIPPING_OPTIONS.find((option) => option.id === optionId) ||
    SHIPPING_OPTIONS[0]
  );
}

export function getShippingCost(subtotal, optionId = "standard") {
  if (subtotal >= FREE_SHIPPING_MINIMUM) {
    return 0;
  }

  return getShippingOption(optionId).cost;
}

export function getAmountUntilFreeShipping(subtotal) {
  return Math.max(FREE_SHIPPING_MINIMUM - subtotal, 0);
}
