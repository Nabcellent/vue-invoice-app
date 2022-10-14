<template>
    <router-link :to="{name:'Invoice', params:{id:invoice.id}}" class="invoice flex">
        <div class="left flex">
            <span class="tracking-number">#{{ invoice.id }}</span>
            <span class="due-date">{{ invoice.payment_due_date }}</span>
            <span class="person">{{ invoice.client_name }}</span>
        </div>
        <div class="right flex">
            <span class="price">KES{{ invoice.invoice_total }}</span>
            <div class="status-button flex"
                 :class="{paid:invoice.invoice_paid, draft:invoice.invoice_draft, pending:invoice.invoice_pending}">
                <span v-if="invoice.invoice_paid">Paid</span>
                <span v-if="invoice.invoice_draft">Draft</span>
                <span v-if="invoice.invoice_pending">Pending</span>
            </div>

            <div class="icon"><img src="@/assets/icon-arrow-right.svg" alt=""></div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Invoice",
    props: ['invoice']
}
</script>

<style scoped>

</style>