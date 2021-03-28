import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default class AddressModel {
  address1 = ref("");
  address2 = ref("");
  cityTown = ref("");
  stateProvince = ref("");
  postalCode = ref("");

  get rules() {
    return {
      address1: { required, minLength: minLength(5) },
      address2: {},
      cityTown: { required },
      stateProvince: { required, minLength: minLength(2) },
      postalCode: { required, minLength: minLength(5) }
    };
  }
  toModel() {
    console.error("!!");
    return useVuelidate(this.rules, this);
  }
  clear() {
    // console.log("parent");
    // this.address1.value = "";
    // this.address2.value = "";
    // this.postalCode.value = "";
    // this.stateProvince.value = "";
    // this.city.value = "";
  }

  setFrom(address) {
    Object.assign(this, address);
    // this.address1 = address.address1;
    // this.address2 = address.address2;
    // this.cityTown = address.cityTown;
    // this.stateProvince = address.stateProvince;
    // this.postalCode = address.postalCode;
  }
}
