# Copyright 2026 Premier Cosmetic
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    iface_display_pricelist_discount = fields.Boolean(
        string="Mostrar descuento de tarifa",
        help="Muestra el precio original (tarifa base) tachado y el % de "
        "descuento en cada línea del TPV.",
        default=True,
    )
    iface_display_pricelist_name = fields.Boolean(
        string="Mostrar tarifa aplicada",
        help="Muestra la tarifa aplicada en la parte superior de las líneas "
        "del ticket del TPV.",
        default=True,
    )
    iface_base_discount_button = fields.Boolean(
        string="Botón 'Descuento sobre base'",
        help="Añade un botón en el TPV para aplicar a la línea seleccionada un "
        "descuento sobre el precio base de la tarifa (fija el precio = base * "
        "(1 - %/100)), sin cálculos manuales.",
        default=True,
    )
