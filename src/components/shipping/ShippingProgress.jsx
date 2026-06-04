import {
  FREE_SHIPPING_MINIMUM,
  getAmountUntilFreeShipping,
} from "../../constants/shipping";
import { formatPrice } from "../../utils/currency";

function ShippingProgress({ subtotal }) {
  const amountLeft = getAmountUntilFreeShipping(subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_MINIMUM) * 100, 100);

  return (
    <div className="rounded-lg border border-[#b9d9b7] bg-[#e8f3e5] p-4">
      <div className="mb-3 flex items-center justify-between gap-4 text-sm font-bold text-[#102116]">
        <span>
          {amountLeft === 0
            ? "Envio gratis desbloqueado"
            : `Te faltan ${formatPrice(amountLeft)} para envio gratis`}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[#1f7a3a] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ShippingProgress;
