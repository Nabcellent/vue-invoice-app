<template>
    <div class="invoice-wrap flex flex-column" @click="checkClick" ref="invoiceWrap">
        <form @submit.prevent="submitForm" class="invoice-content">
            <h1>New Invoice</h1>

            <div class="bill-from flex flex-column">
                <h4>Bill From</h4>

                <div class="input flex flex-column">
                    <label for="biller-street-address">Street Address</label>
                    <input type="text" required id="biller-street-address" v-model="billerStreetAddress">
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="biller-city">City</label>
                        <input type="text" required id="biller-city" v-model="billerCity">
                    </div>
                    <div class="input flex flex-column">
                        <label for="biller-zip-code">Zip Code</label>
                        <input type="text" required id="biller-zip-code" v-model="billerZipCode">
                    </div>
                    <div class="input flex flex-column">
                        <label for="biller-country">Country</label>
                        <input type="text" required id="biller-country" v-model="billerCountry">
                    </div>
                </div>
            </div>

            <div class="bill-to flex flex-column">
                <h4>Bill To</h4>

                <div class="input flex flex-column">
                    <label for="client-name">Client's Name</label>
                    <input type="text" required id="client-name" v-model="clientName">
                </div>
                <div class="input flex flex-column">
                    <label for="client-email">Client's Email</label>
                    <input type="text" required id="client-email" v-model="clientEmail">
                </div>
                <div class="input flex flex-column">
                    <label for="client-street-address">Street Address</label>
                    <input type="text" required id="client-street-address" v-model="clientStreetAddress">
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="client-city">City</label>
                        <input type="text" required id="client-city" v-model="clientCity">
                    </div>
                    <div class="input flex flex-column">
                        <label for="client-zip-code">Zip Code</label>
                        <input type="text" required id="client-zip-code" v-model="clientZipCode">
                    </div>
                    <div class="input flex flex-column">
                        <label for="client-country">Country</label>
                        <input type="text" required id="client-country" v-model="clientCountry">
                    </div>
                </div>
            </div>

            <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoice-date">Invoice Date</label>
                        <input type="text" required id="invoice-date" v-model="invoiceDate" disabled>
                    </div>
                    <div class="input flex flex-column">
                        <label for="payment-due-date">Payment Due</label>
                        <input type="text" required id="payment-due-date" v-model="paymentDueDate" disabled>
                    </div>
                </div>

                <div class="input flex flex-column">
                    <label for="payment-terms">Payment Terms</label>
                    <select required id="payment-terms" v-model="paymentTerms">
                        <option value="30">Net 30 days</option>
                        <option value="60">Net 60 days</option>
                    </select>
                </div>
                <div class="input flex flex-column">
                    <label for="product-description">Product Description</label>
                    <input type="text" required id="product-description" v-model="productDescription">
                </div>

                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading flex">
                            <th class="name">Item Name</th>
                            <th class="qty">Qty</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>

                        <tr class="table-items flex" v-for="(item, i) in invoiceItemList" :key="i">
                            <td class="name"><input type="text" v-model="item.name"></td>
                            <td class="qty"><input type="text" v-model="item.qty"></td>
                            <td class="price"><input type="text" v-model="item.price"></td>
                            <td class="total flex">KES{{ (item.total = item.qty * item.price) }}</td>
                            <img src="@/assets/icon-delete.svg" alt="" @click="deleteInvoiceItem(item.id)">
                        </tr>
                    </table>

                    <div class="flex button" @click="addNewInvoiceItem">
                        <img src="@/assets/icon-plus.svg" alt="">
                        Add New Item
                    </div>
                </div>
            </div>

            <div class="save flex">
                <div class="left">
                    <button class="red" @click="closeInvoice">Cancel</button>
                </div>
                <div class="right flex">
                    <button class="dark-purple" @click="saveDraft">Save Draft</button>
                    <button class="purple" @click="publishInvoice">Create Invoice</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "InvoiceModal",
    data: () => ({
        billerStreetAddress: null,
        billerCity: null,
        billerZipCode: null,
        billerCountry: null,
        clientName: null,
        clientEmail: null,
        clientStreetAddress: null,
        clientCity: null,
        clientZipCode: null,
        clientCountry: null,
        invoiceDateUnix: null,
        invoiceDate: null,
        paymentTerms: null,
        paymentDueDate: null,
        paymentDueDateUnix: null,
        productDescription: null,
        invoiceDraft: null,
        invoiceTotal: 0,
        invoicePending: null,
        invoiceItemList: [],
    })
}
</script>

<style scoped>

</style>