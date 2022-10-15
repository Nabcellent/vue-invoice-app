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
                <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
                <button @click="deleteInvoice(invoice.docId)" class="red">Delete</button>
                <button @click="updateStatusToPaid(invoice.docId)" class="green" v-if="invoice.invoice_pending">
                    Mark as Paid
                </button>
                <button class="orange" v-if="invoice.invoice_draft || invoice.invoice_paid"
                        @click="updateStatusToPending(invoice.docId)">Mark as Pending
                </button>
            </div>
        </div>

        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex-column flex">
                    <p><span>#</span>{{ invoice.id }}</p>
                    <p>{{ invoice.product_description }}</p>
                </div>
                <div class="right flex flex-column">
                    <p>{{ invoice.biller_street_address }}</p>
                    <p>{{ invoice.biller_city }}</p>
                    <p>{{ invoice.biller_zip_code }}</p>
                    <p>{{ invoice.biller_country }}</p>
                </div>
            </div>

            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ invoice.invoice_date }}</p>

                    <h4>Payment Date</h4>
                    <p>{{ invoice.payment_due_date }}</p>
                </div>

                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ invoice.client_name }}</p>
                    <p>{{ invoice.client_street_address }}</p>
                    <p>{{ invoice.client_city }}</p>
                    <p>{{ invoice.client_zip_code }}</p>
                    <p>{{ invoice.client_country }}</p>
                </div>

                <div class="send-to flex flex-column">
                    <h4>Send To</h4>
                    <p>{{ invoice.client_email }}</p>
                </div>
            </div>

            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>

                    <div class="item flex" v-for="(item, i) in invoice.invoice_item_list" :key="i">
                        <p>{{ item.name }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>

                <div class="total flex">
                    <p>Amount Due</p>
                    <p>{{ invoice.invoice_total }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

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
        ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE', 'TOGGLE_INVOICE']),
        ...mapActions(['DELETE_INVOICE', 'UPDATE_STATUS_TO_PAID', 'UPDATE_STATUS_TO_PENDING']),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.id)
            this.invoice = this.currentInvoice[0]
        },

        toggleEditInvoice() {
            this.TOGGLE_EDIT_INVOICE()
            this.TOGGLE_INVOICE()
        },

        updateStatusToPaid(docId) {
            this.UPDATE_STATUS_TO_PAID(docId)
        },

        updateStatusToPending(docId) {
            this.UPDATE_STATUS_TO_PENDING(docId)
        },

        async deleteInvoice(docId) {
            await this.DELETE_INVOICE(docId)

            this.$router.push({name: 'Home'})
        }
    },
    computed: {
        ...mapState(['currentInvoice', 'editInvoice'])
    },
    watch: {
        editInvoice() {
            if (!this.editInvoice) this.invoice = this.currentInvoice[0]
        }
    }
}
</script>

<style lang="scss" scoped>
.invoice-view {
    .nav-link {
        margin-bottom: 32px;
        align-items: center;
        color: #fff;
        font-size: 12px;

        img {
            margin-right: 16px;
            width: 7px;
            height: 10px;
        }
    }

    .header, .invoice-details {
        background-color: #1e2139;
        border-radius: 20px;
    }

    .header {
        align-items: center;
        padding: 24px 32px;
        font-size: 12px;

        .left {
            align-items: center;

            span {
                color: #dfe3fa;
                margin-right: 16px;
            }
        }

        .right {
            flex: 1;
            justify-content: flex-end;

            button {
                color: #fff;
            }
        }
    }

    .invoice-details {
        padding: 48px;
        margin-top: 24px;

        .top {
            div {
                color: #dfe3fa;
                flex: 1;
            }

            .left {
                font-size: 12px;

                p:first-child {
                    font-size: 14px;
                    text-transform: uppercase;
                    color: #fff;
                    margin-bottom: 8px;
                }

                p:nth-child(2) {
                    font-size: 16px;
                }

                span {
                    color: #888eb0;
                }
            }

            .right {
                font-size: 12px;
                align-items: flex-end;
            }
        }

        .middle {
            margin-top: 50px;
            color: #dfe3fa;
            gap: 16px;

            h4 {
                font-size: 12px;
                font-weight: 400;
                margin-bottom: 12px;
            }

            p {
                font-size: 16px;
            }

            .bill, .payment {
                flex: 1
            }

            .payment {
                h4:nth-child(3) {
                    margin-top: 32px;
                }

                p {
                    font-weight: 600;
                }
            }

            .bill {
                p:nth-child(2) {
                    font-size: 16px;
                }

                p:nth-child(3) {
                    margin-top: auto;
                }

                p {
                    font-size: 12px;
                }
            }

            .send-to {
                flex: 2;
            }
        }

        .bottom {
            margin-top: 50px;

            .billing-items {
                padding: 32px;
                border-radius: 20px 20px 0 0;
                background-color: #252945;

                .heading {
                    color: #dfe3fa;
                    font-size: 12px;
                    margin-bottom: 32px;

                    p:first-child {
                        flex: 3;
                        text-align: left;
                    }

                    p {
                        flex: 1;
                        text-align: right;
                    }
                }

                .item {
                    margin-bottom: 32px;
                    font-size: 13px;
                    color: #fff;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    p:first-child {
                        flex: 3;
                        text-align: left;
                    }

                    p {
                        flex: 1;
                        text-align: right;
                    }
                }
            }

            .total {
                color: #fff;
                padding: 32px;
                background-color: rgba(12, 14, 22, .7);
                align-items: center;
                border-radius: 0 0 20px 20px;

                p {
                    flex: 1;
                    font-size: 12px;
                }

                p:nth-child(2) {
                    font-size: 28px;
                    text-align: right;
                }
            }
        }
    }
}
</style>