<template>
  <div class="border rounded p-2">
    <slot />
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        id="address1"
        type="text"
        class="form-control"
        placeholder="Street Address"
        :value="address.address1.$model"
        :disabled="isDisabled"
        @input="
          $emit('input', { prop: 'address1', value: $event.target.value })
        "
      >
      <validation-message :model="address.address1" />
    </div>
    <div class="form-group">
      <label for="address2">Suite/Apartment #</label>
      <input
        id="address2"
        type="text"
        class="form-control"
        placeholder=""
        :value="address.address2.$model"
        :disabled="isDisabled"
        @input="
          $emit('input', { prop: 'address2', value: $event.target.value })
        "
      >
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="cityTown">City</label>
        <input
          id="cityTown"
          type="text"
          class="form-control"
          placeholder="e.g. New York"
          :value="address.cityTown.$model"
          :disabled="isDisabled"
          @input="
            $emit('input', { prop: 'cityTown', value: $event.target.value })
          "
        >
        <validation-message :model="address.cityTown" />
      </div>
      <div class="form-group col-md-3">
        <label for="stateProvince">State</label>
        <select
          id="stateProvince"
          class="form-control"
          :value="address.stateProvince.$model"
          :disabled="isDisabled"
          @input="
            $emit('input', {
              prop: 'stateProvince',
              value: $event.target.value,
            })
          "
        >
          <option
            v-for="s in states"
            :key="s.abbreviation"
            :value="s.abbreviation"
          >
            {{ stateFormat(s) }}
          </option>
        </select>
        <validation-message :model="address.stateProvince" />
      </div>
      <div class="form-group col-md-3">
        <label for="postalCode">Zipcode</label>
        <input
          id="postalCode"
          type="text"
          class="form-control"
          placeholder="e.g. 10101"
          :value="address.postalCode.$model"
          :disabled="isDisabled"
          @input="
            $emit('input', { prop: 'postalCode', value: $event.target.value })
          "
        >
        <validation-message :model="address.postalCode" />
      </div>
    </div>
  </div>
</template>

<script>
import states from '@/lookup/states';
import formatters from '@/formatters';
import { minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ValidationMessage from '../components/ValidationMessage';

export default {
  components: { ValidationMessage },
  props: {
    address: {
      type: Object,
      default: () => {},
    },
    isDisabled: {
      type: Boolean,
    },
  },
  emits: ['input'],
  setup(props) {
    return {
      states,
      ...formatters,
    };
  },
};
</script>