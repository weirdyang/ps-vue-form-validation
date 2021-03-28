<template>
  <div>
    <div class="alert alert-danger" v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
      message: {
          type: String,
          required: true,
      }
  },
  setup(props){
      console.log(props.message);
      return {

      };
  }
};
</script>