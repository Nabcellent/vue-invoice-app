<template>
    <div v-if="invoice" class="invoice-view container">
        <router-link :to="{name:'Home'}" class="nav-link flex">
            <img src="@/assets/icon-arrow-left.svg" alt=""> Go Back
        </router-link>

        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div class="status-button flex"
                     :class="{paid:invoice.invoice_paid, draft:invoice.invoice_draft, pending:invoice.invoice_pending}">
                    <span v-if="invoice.invoice_paid">Paid</span>
                    <span v-if="invoice.invoice_draft">Draft</span>
                    <span v-if="invoice.invoice_pending">Pending</span>
                </div>
            </div>
            <div class="right flex">
                <button class="dark-purple" @click="toggleEditInvoice(invoice.docId)">Edit</button>
                <button @click="deleteInvoice(invoice.docId)" class="red">Delete</button>
                <button class="green" v-if="invoice.invoice_pending" @click="updateStatusToPaid(invoice.docId)">
                    Mark as Paid
                </button>
                <button class="orange" v-if="invoice.invoice_draft || invoice.invoice_paid"
                        @click="updateStatusToPending(invoice.docId)">Mark as Pending
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "InvoiceView",
    data() {
        return {
            invoice: null
        }
    },
    created() {
        this.getCurrentInvoice()
    },
    methods: {
        ...mapMutations(['SET_CURRENT_INVOICE']),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.id)
            this.invoice = this.currentInvoice[0]
        }
    },
    computed: {
        ...mapState(['currentInvoice'])
    }
}
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