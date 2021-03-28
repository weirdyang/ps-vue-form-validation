import { reactive } from '@vue/reactivity';
import { ref } from 'vue';
import BillingAddressModel from '../models/BillingAddressModel';
import CreditCardModel from '../models/CreditCardModel';
import ShippingAddressModel from '../models/ShippingAddressModel';
import useVuelidate from '@vuelidate/core';
export default {
  billing: reactive(new BillingAddressModel()),
  shipping: reactive(new ShippingAddressModel()),
  creditcard: reactive(new CreditCardModel()),
  errorMessage: ref(''),
  clear: function(prop) {
    console.dir(this);
    this[prop].address1 = '';
    this[prop].address2 = '';
    this[prop].postalCode = '';
    this[prop].stateProvince = '';
    this[prop].city = '';
  },

  toModel() {
    const rules = {
      billing: this.billing.rules,
      shipping: this.shipping.rules,
      creditcard: this.creditcard.rules,
    };

    return useVuelidate(rules, this);
  },
};
