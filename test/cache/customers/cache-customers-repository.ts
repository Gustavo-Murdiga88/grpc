import type {ICacheCustomerRepository} from "@/domain/cache/repositories/customer-repository"
import { Customer } from "@/domain/customer/customers";


export class CacheCustomerTestRepository implements ICacheCustomerRepository  {
  private customers: Array<Customer> = [];
  async findAll(): Promise<Array<Customer>> {
    return this.customers
  }
  async setAll(customers: Array<Customer>): Promise<void> {
    this.customers.push(...customers)
  }
}