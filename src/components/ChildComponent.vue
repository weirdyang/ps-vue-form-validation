<template>
  <div>
    <div class="address__field">
      <label for="phone-number">Phone number</label>
      <input
        type="text"
        id="phone-number"
        :value="sample"
        @input="$emit('update:sample', $event.target.value)"
      />
    </div>
    <div class="address__field">
      <label for="is-home-address">Is home address?</label>
      <input
        type="checkbox"
        id="is-home-address"
        :checked="truth"
        @change="$emit('update:truth', $event.target.checked)"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sample: {
      type: String,
    },
    truth: {
      type: Boolean,
    },
  },
  setup() {},
};
</script>