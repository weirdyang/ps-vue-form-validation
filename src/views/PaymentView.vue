<template>
  <div>
    // eslint-disable-next-line vue/no-v-model-argument
    <child-component
      v-model:sample="demo.sample"
      v-model:truth="demo.truth"
    />
    <pre>
      {{ demo }}
    </pre>
    <h3>Payment</h3>
    <!--submit.prevent prevents form submission i.e. return false-->
    <form
      novalidate
      @submit.prevent="onSave"
    >
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping information</strong></div>

          <address-view
            :address="model.shipping"
            :is-disabled="false"
            @input="updateShipping"
          >
            <div class="form-group">
              <label for="name">Name</label><input
                id="name"
                v-model="model.shipping.fullName.$model"
                type="text"
                name="name"
                class="form-control"
                placeholder="enter name"
              >
            </div>
            <!--name-->
            <div class="form-group">
              <label for="company">Company Name</label><input
                id="company"
                v-model="model.shipping.company.$model"
                type="text"
                name="name"
                class="form-control"
                placeholder="enter company name"
              >
            </div>
          </address-view>
          <div class="form-group">
            <input
              type="submit"
              value="submit"
              class="btn btn-success"
            >
          </div>
        </div>

        <!--end of main form -->
        <div class="col-md-6">
          <div><strong>Billing Information</strong></div>

          <address-view
            :address="model.billing"
            :is-disabled="model.billing.sameAsShipping.value"
          >
            <div class="form-check">
              <!--for checkbox label below input -->
              <input
                id="same-shipping"
                v-model="model.billing.sameAsShipping.$model"
                type="checkbox"
                name="same-as-shipping"
                class="form-check-input"
              >
              <label
                for="same-shipping"
                class="form-check-label"
              >
                Same as shipping?
              </label>
            </div>
          </address-view>
          <div>
            <div>
              <strong>Credit card</strong>
              <div class="form-group">
                <label for="cc-number">Credit card number</label><input
                  id="cc-number"
                  v-model="model.creditcard.number.$model"
                  class="form-control"
                  type="text"
                  name="cc-number"
                  placeholder="enter cc number"
                >
                <validation-message :model="model.creditcard.number" />
              </div>
              <div class="form-group">
                <label for="cc-number">name on card</label><input
                  id="cc-name"
                  v-model="model.creditcard.name.$model"
                  class="form-control"
                  type="text"
                  name="cc-name"
                  placeholder="enter name on card"
                >
                <validation-message :model="model.creditcard.name" />
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="expiration-month">Expiration Month</label>
                  <select
                    id="expiration-month"
                    v-model="model.creditcard.expirationMonth.$model"
                    name="expiration-month"
                    class="form-control"
                  >
                    <option
                      v-for="month in months"
                      :key="month.number"
                      :value="month.number"
                    >
                      {{ month.name }}
                    </option>
                  </select>
                  <validation-message
                    :model="model.creditcard.expirationMonth"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="expiration-year">Expiration Year</label>
                  <select
                    id="expiration-year"
                    v-model="model.creditcard.expirationYear.$model"
                    name="expiration-year"
                    class="form-control"
                  >
                    <option
                      v-for="year in years"
                      :key="year"
                      :value="year"
                    >
                      {{ year }}
                    </option>
                  </select>
                  <validation-message
                    :model="model.creditcard.expirationYear"
                  />
                </div>
                <div class="form-group">
                  <label for="cc-cvv">CVV</label><input
                    id="cc-cvv"
                    v-model="model.creditcard.cvv.$model"
                    class="form-control"
                    type="text"
                    name="cc-cvv"
                    placeholder="enter cvv on card"
                  >
                  <validation-message :model="model.creditcard.cvv" />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="model.creditcard.$invalid"
            class="text-danger"
          >
            <ul>
              <li
                v-for="e in model.creditcard.$errors"
                :key="e"
              >
                {{ `${e.$property} ${e.$message}` }}
              </li>
            </ul>
          </div>
        </div>
        <!-- end of billing -->
      </div>
    </form>
    <div>
      <pre>
      {{ payment }}
    </pre>
      <pre> {{ model.shipping }} </pre>
    </div>
  </div>
</template>

<script>
import { computed, watch, reactive } from 'vue';
import states from '../lookup/states';
import months from '../lookup/months';
import formatters from '../formatters/index';
import AddressView from './AddressView.vue';
import state from '../state/index';
import ChildComponent from '../components/ChildComponent.vue';
import ValidationMessage from '../components/ValidationMessage.vue';
export default {
  components: { AddressView, ValidationMessage, ChildComponent },
  emits: ['onError'],
  setup() {
    const payment = reactive(state);
    const demo = reactive({
      sample: 'hello',
      truth: false,
    });
    async function onSave() {
      if (await model.value.$validate()) {
        state.errorMessage.value = 'we cant save yet';
      }
    }
    const zipcode = computed({
      get: () => payment.postalCode,
      set: (val) => {
        if (val && typeof val === 'string') {
          if (val.length <= 5 || val.indexOf('-') > -1) {
            payment.postalCode = val;
          } else {
            payment.postalCode = `${val.substring(0, 5)}-${val.substring(5)}`;
          }
        }
      },
    });
    // if something changes i want to know
    watch(
      // What to watch
      () => payment.billing.sameAsShipping,
      // What to do
      () => {
        if (payment.billing?.sameAsShipping) {
          payment.billing.setFrom(payment.shipping);
        }
      },
    );
    const updateShipping = (data) => {
      changeProp('shipping', data.prop, data.value);
    };
    const updateBilling = (data) => {
      changeProp('billing', data.prop, data.value);
    };
    const changeProp = (objectName, prop, newValue) => {
      payment[objectName][prop] = newValue;
    };
    const years = Array.from({ length: 10 }, (_, i) => i + 2020);

    const model = state.toModel();

    return {
      model,
      updateShipping,
      updateBilling,
      payment,
      states,
      onSave,
      ...formatters,
      zipcode,
      months,
      years,
      demo,
    };
  },
};
</script>
