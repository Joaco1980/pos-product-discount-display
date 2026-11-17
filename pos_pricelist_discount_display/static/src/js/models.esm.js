// Copyright 2026 Premier Cosmetic
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import {Orderline} from "@point_of_sale/app/generic_components/orderline/orderline";
import {PosOrderline} from "@point_of_sale/app/models/pos_order_line";
import {formatCurrency} from "@point_of_sale/app/models/utils/currency";
import {patch} from "@web/core/utils/patch";

patch(PosOrderline.prototype, {
    /**
     * Precio unitario "base" de la linea: el precio ANTES de aplicar el
     * descuento/formula de la regla de tarifa que se esta aplicando.
     * Se deriva del propio "Basado en" de la regla (base / base_pricelist_id),
     * igual que hace product.get_price en el core:
     *   - Basado en "Otra lista de precios"  -> precio de esa tarifa base.
     *   - Basado en "Coste"                  -> standard_price.
     *   - Basado en "Precio de venta"        -> lst_price (ficha del producto).
     */
    getPricelistBaseUnitPrice() {
        const product = this.product_id;
        const qty = this.get_quantity();
        const pricelist = this.order_id?.pricelist_id;
        const rule = product.getPricelistRule(pricelist, qty);
        if (rule && rule.base === "pricelist" && rule.base_pricelist_id) {
            // recurring=true: resuelve toda la cadena de tarifas base.
            return product.get_price(rule.base_pricelist_id, qty, 0, true);
        }
        if (rule && rule.base === "standard_price") {
            return product.standard_price;
        }
        return product.lst_price;
    },

    /**
     * Datos del descuento de tarifa a mostrar, comparando el precio aplicado
     * con el precio base de la regla.
     */
    getPricelistDiscountData() {
        const noData = {show: false};
        if (!this.config.iface_display_pricelist_discount) {
            return noData;
        }
        // Precio unitario aplicado (sin impuestos), ya con la tarifa del pedido.
        const appliedUnit = this.get_unit_price();
        if (!appliedUnit || appliedUnit <= 0) {
            return noData;
        }
        // Precio unitario base (sin impuestos) segun el "Basado en" de la regla.
        const baseUnit = this.getPricelistBaseUnitPrice();
        if (!baseUnit || baseUnit <= appliedUnit) {
            return noData;
        }
        const pct = (1 - appliedUnit / baseUnit) * 100;
        if (pct < 0.01) {
            return noData;
        }
        // get_unit_display_price puede llevar impuesto incluido o no; escalamos
        // el original con el mismo factor para que el tachado quede en la misma
        // base que el precio visible.
        const displayUnit = this.get_unit_display_price();
        const originalDisplay = displayUnit * (baseUnit / appliedUnit);
        return {
            show: true,
            original: formatCurrency(originalDisplay, this.currency),
            // Porcentaje efectivo con 2 decimales (vale para %, importe fijo o formula).
            discountStr: (Math.round(pct * 100) / 100).toString(),
        };
    },

    getDisplayData() {
        const data = super.getDisplayData();
        const pl = this.getPricelistDiscountData();
        return {
            ...data,
            plShowDiscount: pl.show,
            plOriginalUnitPrice: pl.original || "",
            plDiscountStr: pl.discountStr || "",
        };
    },
});

// Declaramos los nuevos campos como props opcionales de la linea, o el
// componente lanzaria un error de validacion de props.
patch(Orderline, {
    props: {
        ...Orderline.props,
        line: {
            ...Orderline.props.line,
            shape: {
                ...Orderline.props.line.shape,
                plShowDiscount: {type: Boolean, optional: true},
                plOriginalUnitPrice: {type: String, optional: true},
                plDiscountStr: {type: String, optional: true},
            },
        },
    },
});
