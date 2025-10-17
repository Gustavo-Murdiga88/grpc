
import {type ICustomerRepository, type CustomerProps} from "../../../src/domain/customer/application/repositories/customer-repository";
import {Customer} from "../../../src/domain/customer/enterprise/entities/customers";

export class CustomerTestRepository implements ICustomerRepository {
  private customers: Array<Customer> = [];

  async findAll(): Promise<Array<Customer>> {
    return this.customers; 
  }
  async create(customer: CustomerProps): Promise<Customer> {
    const newCustomer =  Customer.create({
      addressId: customer.addressId,
      age: customer.age,
      name: customer.name,
    })

    this.customers.push(newCustomer);

    return newCustomer
  }
}