import { SHIPPING_OPTIONS, getShippingCost } from "../../constants/shipping";
import { formatPrice } from "../../utils/currency";

function ShippingSelector({ selectedShippingId, subtotal, onChange }) {
  return (
    <div className="space-y-3">
      {SHIPPING_OPTIONS.map((option) => {
        const cost = getShippingCost(subtotal, option.id);

        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
              selectedShippingId === option.id
                ? "border-[#1f7a3a] bg-[#e8f3e5]"
                : "border-[#d7e3d2] bg-white hover:border-[#1f7a3a]"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={selectedShippingId === option.id}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 accent-[#1f7a3a]"
            />

            <span className="min-w-0 flex-1">
              <span className="block font-bold text-[#102116]">
                {option.title}
              </span>
              <span className="mt-1 block text-sm text-[#667369]">
                {option.description}
              </span>
            </span>

            <span className="shrink-0 font-extrabold text-[#1f7a3a]">
              {cost === 0 ? "Gratis" : formatPrice(cost)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default ShippingSelector;
