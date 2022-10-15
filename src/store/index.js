import { createStore } from 'vuex'
import db from '../firebase/firebase.init.js'
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export default createStore({
    state: {
        invoices: [],
        invoiceModal: null,
        modalActive: null,
        invoicesLoaded: null,
        currentInvoice: null,
        editInvoice: null
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
        },
        TOGGLE_EDIT_INVOICE(state) {
            state.editInvoice = !state.editInvoice
        },
        DELETE_INVOICE(state, payload) {
            state.invoices = state.invoices.filter(i => i.docId !== payload)
        },
        UPDATE_STATUS_TO_PAID(state, payload) {
            state.invoices.forEach(i => {
                if (i.docId === payload) {
                    i.invoice_paid = true
                    i.invoice_pending = false
                }
            })
        },
        UPDATE_STATUS_TO_PENDING(state, payload) {
            state.invoices.forEach(i => {
                if (i.docId === payload) {
                    i.invoice_paid = false
                    i.invoice_pending = true
                    i.invoice_draft = false
                }
            })
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
        },

        async UPDATE_INVOICE({commit, dispatch}, {docId, routeId}) {
            commit('DELETE_INVOICE', docId)

            await dispatch('GET_INVOICES')

            commit('TOGGLE_INVOICE')
            commit('TOGGLE_EDIT_INVOICE')
            commit('SET_CURRENT_INVOICE', routeId)
        },

        async DELETE_INVOICE({commit}, docId) {
            await deleteDoc(doc(db, 'invoices', docId))

            commit('DELETE_INVOICE', docId)
        },

        async UPDATE_STATUS_TO_PAID({commit}, docId) {
            await updateDoc(doc(db, 'invoices', docId), {
                invoice_paid: true,
                invoice_pending: false
            })

            commit('UPDATE_STATUS_TO_PAID', docId)
        },

        async UPDATE_STATUS_TO_PENDING({commit}, docId) {
            await updateDoc(doc(db, 'invoices', docId), {
                invoice_paid: false,
                invoice_pending: true,
                invoice_draft: false,
            })

            commit('UPDATE_STATUS_TO_PAID', docId)
        }
    },
    modules: {}
})
