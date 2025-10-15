// Original file: prototypes/stores.proto


export interface CreateCustomerRequest {
  'name'?: (string);
  'age'?: (number);
  'addressId'?: (string);
  '_addressId'?: "addressId";
}

export interface CreateCustomerRequest__Output {
  'name'?: (string);
  'age'?: (number);
  'addressId'?: (string);
}
