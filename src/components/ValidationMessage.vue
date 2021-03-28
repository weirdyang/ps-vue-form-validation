<template>
  <article class="text-danger" v-if="model.$invalid">
    <ul class="list-unstyled">
      <li v-for="err in model.$errors" :key="err">
        {{ err.$message }}
      </li>
    </ul>
  </article>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
};
</script>