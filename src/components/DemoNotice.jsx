function DemoNotice() {
  return (
    <div className="demo-notice">
      <div className="section-shell flex flex-col gap-1 py-2 md:flex-row md:items-center md:justify-between md:gap-6">
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
