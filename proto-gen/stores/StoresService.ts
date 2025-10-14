// Original file: prototypes/stores.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CustomersResponse as _stores_CustomersResponse, CustomersResponse__Output as _stores_CustomersResponse__Output } from '../stores/CustomersResponse';
import type { StoresResponse as _stores_StoresResponse, StoresResponse__Output as _stores_StoresResponse__Output } from '../stores/StoresResponse';
import type { Void as _stores_Void, Void__Output as _stores_Void__Output } from '../stores/Void';

export interface StoresServiceClient extends grpc.Client {
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
  listCustomers: grpc.handleUnaryCall<_stores_Void__Output, _stores_CustomersResponse>;
  
  listStores: grpc.handleUnaryCall<_stores_Void__Output, _stores_StoresResponse>;
  
}

export interface StoresServiceDefinition extends grpc.ServiceDefinition {
  listCustomers: MethodDefinition<_stores_Void, _stores_CustomersResponse, _stores_Void__Output, _stores_CustomersResponse__Output>
  listStores: MethodDefinition<_stores_Void, _stores_StoresResponse, _stores_Void__Output, _stores_StoresResponse__Output>
}
