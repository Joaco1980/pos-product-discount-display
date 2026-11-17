# POS Pricelist Discount Display (Odoo 18)

Módulo para el TPV de Odoo 18 que muestra:

- El precio original de la tarifa tachado y el % de descuento en cada línea.
- La tarifa aplicada encima de las líneas del ticket.
- Un botón «Desc. base» para aplicar un % sobre el precio base de la tarifa.

## Instalación

El módulo está en la carpeta `pos_pricelist_discount_display/`. Ese es su
nombre técnico y no se puede cambiar: el `__manifest__.py` carga los
archivos JS, XML y CSS con rutas que empiezan por ese nombre.

- **Odoo.sh o repositorio de addons:** añade este repositorio al
  `addons_path` (o como submódulo). Odoo encontrará el módulo dentro de la
  carpeta.
- **Copia manual:** copia la carpeta `pos_pricelist_discount_display`
  completa a tu carpeta de addons. No copies el repositorio con su nombre
  (`pos-product-discount-display`), porque Odoo no acepta guiones en el
  nombre de un módulo.

Después: *Aplicaciones → Actualizar lista de aplicaciones* y busca
«POS Pricelist Discount Display».
