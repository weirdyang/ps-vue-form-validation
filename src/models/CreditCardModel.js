import useVuelidate from '@vuelidate/core';
import { ref } from 'vue';
import { creditcard } from '../validators/index';
import { required } from '@vuelidate/validators';

export default class CreditCardModel {
  number = ref('');
  name = ref('');
  expirationMonth = ref(1);
  expirationYear = ref(2020);
  cvv = ref('');

  get rules() {
    return {
      number: { required, creditcard },
      name: { required },
      expirationMonth: { required },
      expirationYear: { required },
      cvv: { required },
    };
  }
  toModel() {
    console.error('!!');
    return useVuelidate(this.rules, this);
  }
}
