import { createStore } from 'vuex'
import db from '../firebase/firebase.init.js'
import { collection, getDocs } from "firebase/firestore";

export default createStore({
    state: {
        invoices: [],
        invoiceModal: null,
        modalActive: null,
        invoicesLoaded: null,
        currentInvoice: null
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
        },
        SET_CURRENT_INVOICE(state, payload) {
            state.currentInvoice = state.invoices.filter(i => i.id === payload)
        }
    },
    actions: {
        async GET_INVOICES({commit, state}) {
            const results = await getDocs(collection(db, 'invoices'))

            results.forEach(doc => {
                if (!state.invoices.some(i => i.docId === doc.id)) {
                    commit('SET_INVOICES', {docId: doc.id, ...doc.data()})
                }
            })

            commit('INVOICES_LOADED')
        }
    },
    modules: {}
})
