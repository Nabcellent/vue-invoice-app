<template>

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