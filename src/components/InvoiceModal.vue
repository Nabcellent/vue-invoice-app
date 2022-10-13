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