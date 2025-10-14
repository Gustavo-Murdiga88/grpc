import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { Customers as _stores_Customers, Customers__Output as _stores_Customers__Output } from './stores/Customers';
import type { CustomersResponse as _stores_CustomersResponse, CustomersResponse__Output as _stores_CustomersResponse__Output } from './stores/CustomersResponse';
import type { Stores as _stores_Stores, Stores__Output as _stores_Stores__Output } from './stores/Stores';
import type { StoresResponse as _stores_StoresResponse, StoresResponse__Output as _stores_StoresResponse__Output } from './stores/StoresResponse';
import type { StoresServiceClient as _stores_StoresServiceClient, StoresServiceDefinition as _stores_StoresServiceDefinition } from './stores/StoresService';
import type { Void as _stores_Void, Void__Output as _stores_Void__Output } from './stores/Void';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  stores: {
    Customers: MessageTypeDefinition<_stores_Customers, _stores_Customers__Output>
    CustomersResponse: MessageTypeDefinition<_stores_CustomersResponse, _stores_CustomersResponse__Output>
    Stores: MessageTypeDefinition<_stores_Stores, _stores_Stores__Output>
    StoresResponse: MessageTypeDefinition<_stores_StoresResponse, _stores_StoresResponse__Output>
    StoresService: SubtypeConstructor<typeof grpc.Client, _stores_StoresServiceClient> & { service: _stores_StoresServiceDefinition }
    Void: MessageTypeDefinition<_stores_Void, _stores_Void__Output>
  }
}

