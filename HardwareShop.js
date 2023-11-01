const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("WELCOMING"),
    ITEM_LIST: Symbol("SELECT_ITEMS"),
    UPSELL: Symbol("UPSELL_ITEM"),
    TOTAL_AMOUNT: Symbol("TOTAL_CALCULATION"),
});

module.exports = class HardwareShop extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.itemsList = [];
        this.upsell = 0;
        this.totalAmount = 0;
        this.sConfirm = "";
    }

    handleInput(sInput) {
        let aReturn = [];

        switch (this.stateCur) {
            case OrderState.WELCOMING:
                aReturn.push("Welcome to Vignesh's Hardware Shop!");
                aReturn.push("Visit the below page for price information");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("What would you like to buy (snow shovels,household cleaners, furnace filters, screen)?");
                this.stateCur = OrderState.ITEM_LIST;
                break;

            case OrderState.ITEM_LIST:
                if (isValid(sInput)) {
                    this.itemsList.push(sInput);
                    aReturn.push("Would you like to order more items? (Yes/No)");
                } else if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select from the following items: snow shovels, household cleaners, furnace filters, screen");
                } else if (sInput.toLowerCase() === 'no') {
                    aReturn.push("Would you like to add an upsell items? (Yes/No)");
                    this.stateCur = OrderState.UPSELL;
                }
                else {
                    aReturn.push("Invalid item. Please select from above");
                }
                break;

            case OrderState.UPSELL:
                if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select an upsell item: Geeky headlamps, de-scalar ketttle.");
                    this.stateCur = OrderState.TOTAL_AMOUNT;
                    this.upsell = 40;
                } else if (sInput.toLowerCase() === "no") {
                    this.upsell=0;
                    this.stateCur = OrderState.TOTAL_AMOUNT;

                } 
                else{
                    aReturn.push(`Please enter valid input`);
                    this.stateCur = OrderState.UPSELL;
                }
                break;

            case OrderState.TOTAL_AMOUNT:
                this.totalAmount = calculateTotalPrice(this.itemsList) + this.upsell;
                const amount = this.totalAmount;
                const tax = this.totalAmount * TAX_RATE;
                const totalAmount = this.totalAmount + tax;
                aReturn.push(`Total Amount before Tax: $${amount}`);
                aReturn.push(`Tax amount: $${tax}`);
                aReturn.push(`Final amount: $${totalAmount}.`);
                aReturn.push("Thank you for your purchase!");
                aReturn.push("We will let you know from 991-127-3890 when your order is ready or if we have any queries regarding your order");
                this.isDone(true);
                break;
        }

        return aReturn;
    }

    renderForm() {
        return (`<html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c14 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 226.5pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c3 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 228.8pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c8 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 229.5pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c2 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 227.2pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c5 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c12 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c1 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c6 {
                    color: #202122;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 14.5pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c13 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c7 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c9 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c0 {
                    background-color: #ffffff;
                    max-width: 468pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c16 {
                    height: 36pt
                }
        
                .c15 {
                    height: 23.2pt
                }
        
                .c4 {
                    height: 25.5pt
                }
        
                .c10 {
                    height: 27.8pt
                }
        
                .c11 {
                    height: 21.8pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c0 doc-content">
            <p class="c12"><span class="c1">For Curbside Pick up:</span></p>
            <p class="c12"><span class="c1">Text &ldquo;Hi&rdquo; or &ldquo;Hello&rdquo; to 612-123-1234</span></p><a
                id="t.fcad6497ce9277e8f1e7e5a19ab1524612ba133c"></a><a id="t.0"></a>
            <table class="c9">
                <tr class="c11">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c5"><span class="c13">Item</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c5"><span class="c13">Cost</span></p>
                    </td>
                </tr>
                <tr class="c4">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c5"><span class="c6">Snow Shovels</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c5"><span class="c1">$50</span></p>
                    </td>
                </tr>
                <tr class="c4">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c5"><span class="c6">Household cleaners</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c5"><span class="c1">$20</span></p>
                    </td>
                </tr>
                <tr class="c4">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c5"><span class="c6">Furnace filters</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c5"><span class="c1">$16</span></p>
                    </td>
                </tr>
                <tr class="c4">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c5"><span class="c6">Screen for screen door</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c5"><span class="c1">$30</span></p>
                    </td>
                </tr>
            </table>
            <p class="c7"><span class="c1"></span></p><a id="t.e03fca31d57facc923d02880cf9079b924a41126"></a><a id="t.1"></a>
            <table class="c9">
                <tr class="c15">
                    <td class="c8" colspan="1" rowspan="1">
                        <p class="c12"><span class="c1">Upsell Item</span></p>
                    </td>
                    <td class="c14" colspan="1" rowspan="1">
                        <p class="c12"><span class="c1">Price</span></p>
                    </td>
                </tr>
                <tr class="c10">
                    <td class="c8" colspan="1" rowspan="1">
                        <p class="c12"><span class="c6">Geeky Headlamps</span></p>
                    </td>
                    <td class="c14" colspan="1" rowspan="1">
                        <p class="c12"><span class="c1">$40</span></p>
                    </td>
                </tr>
                <tr class="c16">
                    <td class="c8" colspan="1" rowspan="1">
                        <p class="c12"><span class="c6">De-scalar kettle</span></p>
                    </td>
                    <td class="c14" colspan="1" rowspan="1">
                        <p class="c12"><span class="c1">$40</span></p>
                        <p class="c7"><span class="c1"></span></p>
                    </td>
                </tr>
            </table>
            <p class="c7"><span class="c1"></span></p>
        </body>
        
        </html>`

        )
    }
}

function isValid(item) {
    const validItem = [
        "snow shovels","household cleaners", "furnace filters", "screen"
    ];
    return validItem.includes(item.toLowerCase());
}

function calculateTotalPrice(itemsList) {
    let totalPrice = 0;
    for (const item of itemsList) {
        if (itemPrices[item]) {
            totalPrice += itemPrices[item];
        }
    }
    return totalPrice;
}
const itemPrices = {
    "snow shovels": 50,
    "household cleaners": 20,
    "furnace filters": 16,
    "screen": 30,
};

const TAX_RATE = 0.15;




