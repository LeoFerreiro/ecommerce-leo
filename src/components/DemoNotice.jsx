function DemoNotice() {
  return (
    <div className="border-b border-[#b9d9b7] bg-[#e8f3e5]">
      <div className="section-shell flex flex-col gap-2 py-3 text-sm font-semibold text-[#102116] md:flex-row md:items-center md:justify-between">
        <span>Modo demo portfolio</span>
        <span className="text-[#4b574f]">
          No procesa pagos reales ni guarda datos sensibles. El carrito se
          conserva solo en este navegador.
        </span>
      </div>
    </div>
  );
}

export default DemoNotice;
