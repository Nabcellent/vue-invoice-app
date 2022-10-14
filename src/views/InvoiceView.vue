<template>

</template>

<script>
export default {
    name: "InvoiceView"
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

    .left{
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
        gap:1rem;
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