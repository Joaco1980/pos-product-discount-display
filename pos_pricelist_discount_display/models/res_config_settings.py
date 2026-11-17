# Copyright 2026 Premier Cosmetic
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_iface_display_pricelist_discount = fields.Boolean(
        related="pos_config_id.iface_display_pricelist_discount",
        readonly=False,
    )
    pos_iface_display_pricelist_name = fields.Boolean(
        related="pos_config_id.iface_display_pricelist_name",
        readonly=False,
    )
    pos_iface_base_discount_button = fields.Boolean(
        related="pos_config_id.iface_base_discount_button",
        readonly=False,
    )
