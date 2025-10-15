// Original file: prototypes/stores.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateCustomerRequest as _stores_CreateCustomerRequest, CreateCustomerRequest__Output as _stores_CreateCustomerRequest__Output } from '../stores/CreateCustomerRequest';
import type { CreateStoreRequest as _stores_CreateStoreRequest, CreateStoreRequest__Output as _stores_CreateStoreRequest__Output } from '../stores/CreateStoreRequest';
import type { CustomersResponse as _stores_CustomersResponse, CustomersResponse__Output as _stores_CustomersResponse__Output } from '../stores/CustomersResponse';
import type { StoresResponse as _stores_StoresResponse, StoresResponse__Output as _stores_StoresResponse__Output } from '../stores/StoresResponse';
import type { Void as _stores_Void, Void__Output as _stores_Void__Output } from '../stores/Void';

export interface StoresServiceClient extends grpc.Client {
  createCustomer(argument: _stores_CreateCustomerRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createCustomer(argument: _stores_CreateCustomerRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createCustomer(argument: _stores_CreateCustomerRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createCustomer(argument: _stores_CreateCustomerRequest, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  
  createStore(argument: _stores_CreateStoreRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createStore(argument: _stores_CreateStoreRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createStore(argument: _stores_CreateStoreRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  createStore(argument: _stores_CreateStoreRequest, callback: grpc.requestCallback<_stores_Void__Output>): grpc.ClientUnaryCall;
  
  listCustomers(argument: _stores_Void, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_CustomersResponse__Output>): grpc.ClientUnaryCall;
  listCustomers(argument: _stores_Void, metadata: grpc.Metadata, callback: grpc.requestCallback<_stores_CustomersResponse__Output>): grpc.ClientUnaryCall;
  listCustomers(argument: _stores_Void, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_CustomersResponse__Output>): grpc.ClientUnaryCall;
  listCustomers(argument: _stores_Void, callback: grpc.requestCallback<_stores_CustomersResponse__Output>): grpc.ClientUnaryCall;
  
  listStores(argument: _stores_Void, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_StoresResponse__Output>): grpc.ClientUnaryCall;
  listStores(argument: _stores_Void, metadata: grpc.Metadata, callback: grpc.requestCallback<_stores_StoresResponse__Output>): grpc.ClientUnaryCall;
  listStores(argument: _stores_Void, options: grpc.CallOptions, callback: grpc.requestCallback<_stores_StoresResponse__Output>): grpc.ClientUnaryCall;
  listStores(argument: _stores_Void, callback: grpc.requestCallback<_stores_StoresResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StoresServiceHandlers extends grpc.UntypedServiceImplementation {
  createCustomer: grpc.handleUnaryCall<_stores_CreateCustomerRequest__Output, _stores_Void>;
  
  createStore: grpc.handleUnaryCall<_stores_CreateStoreRequest__Output, _stores_Void>;
  
  listCustomers: grpc.handleUnaryCall<_stores_Void__Output, _stores_CustomersResponse>;
  
  listStores: grpc.handleUnaryCall<_stores_Void__Output, _stores_StoresResponse>;
  
}

export interface StoresServiceDefinition extends grpc.ServiceDefinition {
  createCustomer: MethodDefinition<_stores_CreateCustomerRequest, _stores_Void, _stores_CreateCustomerRequest__Output, _stores_Void__Output>
  createStore: MethodDefinition<_stores_CreateStoreRequest, _stores_Void, _stores_CreateStoreRequest__Output, _stores_Void__Output>
  listCustomers: MethodDefinition<_stores_Void, _stores_CustomersResponse, _stores_Void__Output, _stores_CustomersResponse__Output>
  listStores: MethodDefinition<_stores_Void, _stores_StoresResponse, _stores_Void__Output, _stores_StoresResponse__Output>
}
