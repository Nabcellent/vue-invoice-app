<template>
    <div class="invoice-wrap flex flex-column" @click="checkClick" ref="invoiceWrap">
        <form @submit.prevent="submitForm" class="invoice-content">
            <Loading v-show="loading"/>
            <h1 v-if="!editInvoice">New Invoice</h1>
            <h1 v-else>Edit Invoice</h1>

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
                            <td>
                                <img src="@/assets/icon-delete.svg" alt="" @click="deleteInvoiceItem(item.id)">
                            </td>
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
                    <button type="button" class="red" @click="closeInvoice">Cancel</button>
                </div>
                <div class="right flex">
                    <button type="submit" class="dark-purple" @click="saveDraft" v-if="!editInvoice">Save Draft</button>
                    <button type="submit" class="purple" @click="publishInvoice" v-if="!editInvoice">
                        Create Invoice
                    </button>
                    <button type="submit" v-if="editInvoice" class="purple">Update Invoice</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { uid } from "uid";
import db from '../firebase/firebase.init.js'
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Loading from "@/components/Loading.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const store = useStore()
const editInvoice = computed(() => store.state.editInvoice)
const currentInvoice = computed(() => store.state.currentInvoice)

const loading = ref(null)
const dateOptions = ref({year: 'numeric', month: 'short', day: 'numeric'})

const docId = ref(null)
const billerStreetAddress = ref(null)
const billerCity = ref(null)
const billerZipCode = ref(null)
const billerCountry = ref(null)
const clientName = ref(null)
const clientEmail = ref(null)
const clientStreetAddress = ref(null)
const clientCity = ref(null)
const clientZipCode = ref(null)
const clientCountry = ref(null)
const invoiceDateUnix = ref(null)
const invoiceDate = ref(null)
const paymentTerms = ref(null)
const paymentDueDate = ref(null)
const paymentDueDateUnix = ref(null)
const productDescription = ref(null)
const invoiceDraft = ref(null)
const invoiceTotal = ref(0)
const invoicePending = ref(null)
const invoiceItemList = ref([])
const invoiceWrap = ref(null)

onMounted(() => {
    //  Gets current date for invoice date field.
    if (!editInvoice.value) {
        invoiceDateUnix.value = Date.now()
        invoiceDate.value = new Date(invoiceDateUnix.value).toLocaleDateString('en-gb', dateOptions.value)
    }

    if (editInvoice.value) {
        const invoice = currentInvoice.value[0]

        docId.value = invoice.docId
        billerStreetAddress.value = invoice.biller_street_address
        billerCity.value = invoice.biller_city
        billerZipCode.value = invoice.biller_zip_code
        billerCountry.value = invoice.biller_country
        clientName.value = invoice.client_name
        clientEmail.value = invoice.client_email
        clientStreetAddress.value = invoice.client_street_address
        clientCity.value = invoice.client_city
        clientZipCode.value = invoice.client_zip_code
        clientCountry.value = invoice.client_country
        invoiceDateUnix.value = invoice.invoice_date_unix
        invoiceDate.value = invoice.invoice_date
        paymentTerms.value = invoice.payment_terms
        paymentDueDateUnix.value = invoice.payment_due_date_unix
        paymentDueDate.value = invoice.payment_due_date
        productDescription.value = invoice.product_description
        invoicePending.value = invoice.invoice_pending
        invoiceDraft.value = invoice.invoice_draft
        invoiceItemList.value = invoice.invoice_item_list
        invoiceTotal.value = invoice.invoice_total
    }
})

function checkClick(e) {
    if (e.target === invoiceWrap.value) store.commit('TOGGLE_MODAL')
}

function closeInvoice() {
    store.commit('TOGGLE_INVOICE')

    if (editInvoice.value) store.commit('TOGGLE_EDIT_INVOICE')
}

const addNewInvoiceItem = () => invoiceItemList.value.push({
    id: uid(),
    name: '',
    qty: '',
    price: 0,
    total: 0
})

const deleteInvoiceItem = (id) => invoiceItemList.value = invoiceItemList.value.filter(i => i.id !== id)

const getInvoiceTotal = () => {
    invoiceTotal.value = 0;
    invoiceTotal.value = invoiceItemList.value.reduce((prev, item) => prev += item.total, 0)
}

const publishInvoice = () => invoicePending.value = true

const saveDraft = () => invoiceDraft.value = true

async function createInvoice() {
    if (invoiceItemList.value.length <= 0) {
        return alert('Please ensure you fill out work items')
    }

    loading.value = true

    getInvoiceTotal()

    await addDoc(collection(db, 'invoices'), {
        id: uid(6),
        biller_street_address: billerStreetAddress.value,
        biller_city: billerCity.value,
        biller_zip_code: billerZipCode.value,
        biller_country: billerCountry.value,
        client_name: clientName.value,
        client_email: clientEmail.value,
        client_street_address: clientStreetAddress.value,
        client_city: clientCity.value,
        client_zip_code: clientZipCode.value,
        client_country: clientCountry.value,
        invoice_date: invoiceDate.value,
        invoice_date_unix: invoiceDateUnix.value,
        payment_terms: paymentTerms.value,
        payment_due_date: paymentDueDate.value,
        payment_due_date_unix: paymentDueDateUnix.value,
        product_description: productDescription.value,
        invoice_item_list: invoiceItemList.value,
        invoice_total: invoiceTotal.value,
        invoice_pending: invoicePending.value,
        invoice_draft: invoiceDraft.value,
        invoice_paid: null
    })

    store.commit('TOGGLE_INVOICE')
    store.dispatch('GET_INVOICES')

    loading.value = false
}

async function updateInvoice() {
    if (invoiceItemList.value.length <= 0) {
        return alert('Please ensure you fill out work items')
    }

    loading.value = true

    getInvoiceTotal()

    await updateDoc(doc(db, 'invoices', docId.value), {
        biller_street_address: billerStreetAddress.value,
        biller_city: billerCity.value,
        biller_zip_code: billerZipCode.value,
        biller_country: billerCountry.value,
        client_name: clientName.value,
        client_email: clientEmail.value,
        client_street_address: clientStreetAddress.value,
        client_city: clientCity.value,
        client_zip_code: clientZipCode.value,
        client_country: clientCountry.value,
        payment_terms: paymentTerms.value,
        payment_due_date: paymentDueDate.value,
        payment_due_date_unix: paymentDueDateUnix.value,
        product_description: productDescription.value,
        invoice_item_list: invoiceItemList.value,
        invoice_total: invoiceTotal.value,
    })

    store.dispatch('UPDATE_INVOICE', {
        docId: docId.value,
        routeId: route.params.id
    })

    loading.value = false
}

function submitForm() {
    if (editInvoice.value) {
        updateInvoice()
        return
    }

    createInvoice()
}

watch(paymentTerms, (paymentTerms) => {
    const futureDate = new Date()
    paymentDueDateUnix.value = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms))
    paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString('en-gb', dateOptions.value)
})
</script>

<style lang="scss" scoped>
.invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 900px) {
        left: 90px;
    }

    .invoice-content {
        position: relative;
        padding: 56px;
        max-width: 700px;
        width: 100%;
        background-color: #141625;
        color: #fff;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, .2), 0 2px 4px -1px rgba(0, 0, 0, .06);

        h1 {
            margin-bottom: 48px;
            color: #fff;
        }

        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            color: #777f98
        }

        h4 {
            color: #7c5dfa;
            font-size: 12px;
            margin-bottom: 24px;
        }

        //  Bill To * Bill From
        .bill-to, .bill-from {
            margin-bottom: 48px;

            .location-details {
                gap: 1rem;

                div {
                    flex: 1;
                }
            }
        }

        .invoice-work {
            .payment {
                gap: 1.5rem;

                div {
                    flex: 1;
                }
            }

            .work-items {
                .item-list {
                    width: 100%;

                    .table-heading, .table-items {
                        gap: 16px;
                        font-size: 12px;

                        .name {
                            flex-basis: 50%;
                        }

                        .qty {
                            flex-basis: 10%;
                        }

                        .price {
                            flex-basis: 20%;
                        }

                        .total {
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }

                    .table-heading {
                        margin-bottom: 16px;

                        th {
                            text-align: left;
                        }
                    }

                    .table-items {
                        position: relative;
                        margin-bottom: 24px;

                        img {
                            position: absolute;
                            top: 15px;
                            right: 0;
                            width: 12px;
                            height: 16px;
                        }
                    }
                }

                .button {
                    color: white;
                    background-color: #252945;
                    align-items: center;
                    justify-content: center;
                    width: 100%;

                    img {
                        margin-right: 4px;
                    }
                }
            }
        }

        .save {
            margin-top: 60px;

            div {
                flex: 1;
            }

            .right {
                justify-content: flex-end;
            }
        }
    }

    .input {
        margin-bottom: 24px;
    }

    label {
        font-size: 12px;
        margin-bottom: 6px;
    }

    input, select {
        width: 100%;
        background-color: #1e2139;
        color: white;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;

        &:focus {
            outline: none;
        }
    }
}
</style>