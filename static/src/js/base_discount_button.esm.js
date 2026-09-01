// Copyright 2026 Premier Cosmetic
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import {ControlButtons} from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import {NumberPopup} from "@point_of_sale/app/utils/input_popups/number_popup";
import {_t} from "@web/core/l10n/translation";
import {makeAwaitable} from "@point_of_sale/app/store/make_awaitable_dialog";
import {patch} from "@web/core/utils/patch";

patch(ControlButtons.prototype, {
    /**
     * Aplica a la linea seleccionada un descuento sobre el PRECIO BASE de su
     * tarifa (no sobre el precio ya rebajado). La dependienta teclea el % que
     * quiere sobre la base y el modulo fija el precio = base * (1 - %/100).
     */
    async clickBaseDiscount() {
        const order = this.pos.get_order();
        const line = order && order.get_selected_orderline();
        if (!line) {
            this.notification.add(_t("Selecciona primero una línea del ticket."), {
                type: "warning",
            });
            return;
        }
        const base = line.getPricelistBaseUnitPrice();
        if (!base || base <= 0) {
            this.notification.add(_t("No se puede determinar el precio base de esta línea."), {
                type: "warning",
            });
            return;
        }
        const payload = await makeAwaitable(this.dialog, NumberPopup, {
            title: _t("Descuento sobre la tarifa base (%)"),
            startingValue: "",
        });
        if (payload === undefined || payload === null || payload === "") {
            return;
        }
        const pct = parseFloat(("" + payload).replace(",", "."));
        if (isNaN(pct) || pct < 0 || pct > 100) {
            this.notification.add(_t("Introduce un porcentaje entre 0 y 100."), {
                type: "warning",
            });
            return;
        }
        const newPrice = base * (1 - pct / 100);
        line.set_unit_price(newPrice);
        // Marcamos el precio como manual para que la tarifa no lo vuelva a pisar.
        line.price_type = "manual";
        order.recomputeOrderData();
    },
});
