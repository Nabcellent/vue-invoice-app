import { createStore } from 'vuex'
import db from '../firebase/firebase.init.js'
import { collection, getDocs } from "firebase/firestore";

export default createStore({
    state: {
        invoices: [],
        invoiceModal: null,
        modalActive: null,
        invoicesLoaded: null
    },
    mutations: {
        TOGGLE_INVOICE(state) {
            state.invoiceModal = !state.invoiceModal
        },
        TOGGLE_MODAL(state) {
            state.modalActive = !state.modalActive
        },
        SET_INVOICES(state, payload) {
            state.invoices.push(payload)
        },
        INVOICES_LOADED(state) {
            state.invoicesLoaded = true
        }
    },
    actions: {
        async GET_INVOICES({commit, state}) {
            const results = await getDocs(collection(db, 'invoices'))

            results.forEach(doc => {
                if (!state.invoices.some(i => i.docId === doc.id)) {
                    const docData = doc.data()
                    const data = {
                        docId: doc.id,
                        id: docData.id,
                        billerStreetAddress: docData.biller_street_address,
                        billerCity: docData.biller_city,
                        billerZipCode: docData.biller_zip_code,
                        billerCountry: docData.biller_country,
                        clientName: docData.client_name,
                        clientEmail: docData.client_email,
                        clientStreetAddress: docData.client_street_address,
                        clientCity: docData.client_city,
                        clientZipCode: docData.client_zip_code,
                        clientCountry: docData.client_country,
                        invoiceDate: docData.invoice_date,
                        invoiceDateUnix: docData.invoice_date_unix,
                        paymentTerms: docData.payment_terms,
                        paymentDueDate: docData.payment_due_date,
                        paymentDueDateUnix: docData.payment_due_date_unix,
                        productDescription: docData.product_description,
                        invoiceItemList: docData.invoice_item_list,
                        invoiceTotal: docData.invoice_total,
                        invoicePending: docData.invoice_pending,
                        invoiceDraft: docData.invoice_draft,
                        invoicePaid: docData.invoice_paid
                    }

                    commit('SET_INVOICES', data)
                }
            })

            commit('INVOICES_LOADED')
        }
    },
    modules: {}
})
