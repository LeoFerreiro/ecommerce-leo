# VerdeSport: auditoria del catalogo y sistema de filtros

Fecha: 12 de octubre de 2026

## Alcance

Auditoria del catalogo actual en escritorio, tablet y movil, realizada antes de implementar su rediseño. Durante la auditoria no se modificaron archivos del proyecto, logica de filtrado, productos, precios, imagenes ni rutas. Tampoco se instalaron dependencias, realizaron commits o desplegaron cambios.

Se revisaron distribucion, jerarquia visual, espaciados, filtros, buscador, ordenamiento, contador, tarjetas, estados vacios, accesibilidad e interacciones. La identidad a conservar es verde deportivo, blanco, negro, tipografia Poppins y estetica premium.

## 1. Problemas encontrados por prioridad

| Prioridad | Problema | Impacto |
| --- | --- | --- |
| Alta | Encabezado y filtros ocupan demasiado espacio | La primera tarjeta aparece aproximadamente a los 877 px en escritorio, 1202 px en tablet y 1588 px en movil. |
| Alta | Filtros sin etiquetas asociadas | FilterSelect recibe label, pero no lo utiliza. Buscador y precios dependen del placeholder. |
| Alta | Tarjetas inconsistentes con Home | Conservan fotos con object-cover, metadatos antes del nombre, sombras mas fuertes y talles truncados. |
| Alta | Compra sin nombre accesible | Los 15 botones de compra tienen unicamente un icono. Ademas, estan anidados dentro del enlace de la tarjeta. |
| Media | Ordenamiento mezclado con filtros | Cuesta distinguir busqueda, criterios de seleccion y orden de resultados. |
| Media | Opciones y placeholder recortados | Los textos largos pierden legibilidad, especialmente en escritorio y movil. |
| Media | Contador poco visible | Esta dentro del panel de filtros y sus cambios no se anuncian mediante una region accesible. |
| Media | Estado vacio demasiado lejos | En movil hay que atravesar el bloque de filtros para descubrir que no existen coincidencias. |

No se detectaron desbordamientos horizontales en los tamaños revisados, incluido 320 px, ni errores de consola durante las pruebas.

## 2. Propuesta concreta de rediseño

Trasladar la jerarquia de Home al catalogo: superficie blanca, bordes discretos, verde para acciones y Poppins con menos elementos en negrita.

| Escritorio | Tablet y movil |
| --- | --- |
| Encabezado compacto, conservando sus textos | Titulo reducido y menor espacio superior |
| Filtros en columna lateral de unos 240 px | Boton Filtros que abre un panel accesible |
| Buscador, contador y ordenamiento sobre el grid | Buscador visible; contador y ordenamiento fuera del panel |
| Tres columnas junto a los filtros, segun ancho disponible | Una columna en telefonos pequeños y dos cuando haya espacio |
| Criterios organizados con etiquetas visibles | Los mismos criterios, agrupados y con controles tactiles comodos |

### Panel de filtros movil

Necesitaria estado de presentacion para apertura y cierre, manejo de foco y Escape. Debe mantener el filtrado inmediato actual, sin introducir un boton Aplicar ni una seleccion provisional.

### Tarjetas

Seguir el orden visual de Home: marca, nombre, datos secundarios y bloque de precio/compra alineado. Presentar imagenes completas con object-contain y talles legibles, conservando todos los datos existentes.

### Resultados sin coincidencias

Situar el estado sin coincidencias junto al contador y conservar su mensaje y accion de limpieza.

## 3. Interacciones comprobadas

- Busqueda sin coincidencias: contador en cero y estado vacio correcto.
- Limpiar filtros: restaura los 15 productos.
- Nike: 5 resultados.
- Nike combinado con Hombre: 2 resultados.
- Rango de $70.000 a $100.000: 5 resultados.
- Orden ascendente: productos ordenados por precio correctamente.

### Hallazgo funcional independiente

Precio maximo 0 se interpreta como sin limite por la expresion Number(filters.maxPrice) || Infinity. Debe tratarse con autorizacion separada, sin mezclarlo con el rediseño visual. No se modifico este comportamiento.

## 4. Componentes que necesitarian ajustes

- src/pages/Products.jsx
- src/components/products/ProductsHeader.jsx
- src/components/products/ProductFilters.jsx
- src/components/ProductsGrid.jsx
- src/components/products/ProductsEmptyState.jsx
- Componentes de carga del catalogo.
- src/components/ProductCard.jsx y src/components/SearchBar.jsx, coordinando los cambios porque son compartidos con Home.

## 5. Riesgos funcionales a evitar

- Preservar todos los filtros, sus valores, combinacion, ordenamiento, limpieza y parametros de navegacion.
- Evitar que el panel movil duplique controles con estados independientes.
- Mantener intactos los callbacks y la logica de filtrado existentes.
- Verificar que los cambios en componentes compartidos con Home no alteren su presentacion ni comportamiento.
- Conservar el comportamiento de compra: los productos con talle deben continuar llevando al detalle para seleccionarlo.
- No cambiar productos, precios, stock, talles, imagenes o destinos.

## 6. Plan de implementacion por etapas

1. Compactar encabezado y distribuir buscador, contador, ordenamiento y filtros en escritorio.
2. Incorporar etiquetas y panel movil accesible, reutilizando los callbacks actuales.
3. Unificar tarjetas con Home y ajustar grid y estados vacios y de carga.
4. Verificar filtros individuales y combinados, navegacion, compra, teclado y responsive; ejecutar lint y build.

## 7. Capturas de referencia

Las capturas completas se guardaron fuera del repositorio, en esta carpeta local:

`C:/Users/Raple/.codex/visualizations/2026/06/03/019e8f20-021a-7000-8e49-089bc66d70b4/`

- Escritorio completo: verdesport-catalog-audit-desktop.png
- Movil completo: verdesport-catalog-audit-mobile.png
- Escritorio, primera pantalla: verdesport-catalog-audit-desktop-viewport.png
- Movil, primera pantalla: verdesport-catalog-audit-mobile-viewport.png
- Estado sin coincidencias: verdesport-catalog-audit-empty.png

Las capturas son archivos separados; no estan incrustadas en este documento.

## Estado

Informe preparado para revision. La implementacion del catalogo permanece pendiente de autorizacion.
