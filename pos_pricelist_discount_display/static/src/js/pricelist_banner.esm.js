// Copyright 2026 Premier Cosmetic
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import {Component} from "@odoo/owl";
import {OrderWidget} from "@point_of_sale/app/generic_components/order_widget/order_widget";
import {usePos} from "@point_of_sale/app/store/pos_hook";

export class PricelistBanner extends Component {
    static template = "pos_pricelist_discount_display.PricelistBanner";
    setup() {
        this.pos = usePos();
    }

    getPricelistName() {
        const order = this.pos.get_order();
        if (!order || !this.pos.config.iface_display_pricelist_name) {
            return false;
        }
        const pricelist = order.pricelist_id;
        return pricelist ? pricelist.display_name : false;
    }
}

OrderWidget.components = {
    ...OrderWidget.components,
    PricelistBanner,
};
