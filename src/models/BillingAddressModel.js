import { ref } from 'vue';
import AddressModel from './AddressModel';

export default class BillingAddressModel extends AddressModel {
  sameAsShipping = ref(false);

  get rules() {
    return Object.assign({ sameAsShipping: {} }, super.rules);
  }
}
