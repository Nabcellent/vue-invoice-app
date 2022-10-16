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

<script setup>
defineProps(['invoice'])
</script>

<style lang="scss">
.invoice {
    text-decoration: none;
    cursor: pointer;
    gap: 1rem;
    margin-bottom: 1rem;
    color: #fff;
    border-radius: 20px;
    padding: 28px 32px;
    background-color: #1e2139;
    align-items: center;

    span {
        font-size: 13px;
    }

    .left {
        align-items: center;
        flex-basis: 60%;
        gap: 1rem;

        span {
            flex: 1;
        }

        .tracking-number {
            text-transform: uppercase;
        }
    }

    .right {
        gap: 1rem;
        flex-basis: 40%;
        align-items: center;

        .price {
            flex: 1;
            font-size: 1rem;
            font-weight: 600;
        }
    }
}
</style>