<template>
  <div>
    <error :message="errorMessage" />
    <payment-view />
  </div>
</template>
<script>
import { ref } from "vue";
import Error from "./components/Error.vue";
import PaymentView from "./views/PaymentView";
import state from "./state/index";
export default {
  components: {
    PaymentView,
    Error,
  },
  setup() {
    return {
      errorMessage: state.errorMessage,
    };
  },
};
</script>