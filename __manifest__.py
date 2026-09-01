# Copyright 2026 Premier Cosmetic
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
{
    "name": "POS Pricelist Discount Display",
    "summary": "Muestra el descuento de la tarifa (precio original tachado + %) "
    "y la tarifa aplicada en el ticket del TPV.",
    "version": "18.0.1.0.0",
    "category": "Point of Sale",
    "author": "Premier Cosmetic",
    "website": "https://www.premiercosmetic.es",
    "license": "AGPL-3",
    "depends": ["point_of_sale"],
    "data": [
        "views/res_config_settings_view.xml",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_pricelist_discount_display/static/src/js/models.esm.js",
            "pos_pricelist_discount_display/static/src/js/pricelist_banner.esm.js",
            "pos_pricelist_discount_display/static/src/js/base_discount_button.esm.js",
            "pos_pricelist_discount_display/static/src/xml/pos_pricelist_discount.xml",
            "pos_pricelist_discount_display/static/src/css/style.css",
        ],
    },
    "installable": True,
}
