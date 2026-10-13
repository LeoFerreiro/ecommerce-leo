# Checkout: propuesta futura para retiro en sucursal

Estado: propuesta pendiente de aprobacion. No implementada en la Etapa 6.3.

## Comportamiento conservado

Nombre, correo y direccion siguen siendo obligatorios para todos los metodos,
incluido retiro. No se modifican tarifas, umbral de envio gratis ni el flujo demo.

## Propuesta para una etapa posterior

- Aprobar primero si la direccion debe solicitarse solo para envios a domicilio.
- Si se aprueba esa regla, ajustar conjuntamente la visibilidad del campo,
  obligatoriedad, errores, foco y resumen cuando cambie el metodo de envio.
- Conservar en memoria la direccion ya ingresada al alternar metodos, sin
  almacenarla de forma persistente ni enviarla a un servidor.
- No mostrar sucursales ni prometer servicios mientras no existan datos reales
  y autorizacion para incorporarlos. El checkout debe seguir siendo demostrativo.
- Coordinar la presentacion del retiro con la futura confirmacion de la simulacion.

## Verificacion futura

Probar envio a domicilio sin direccion, retiro, cambios entre ambos metodos,
conservacion de datos validos, errores accesibles, teclado y responsive.
Verificar que precios, stock, carrito y persistencia permanezcan intactos.
