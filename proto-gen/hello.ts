import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreeterClient as _hello_GreeterClient, GreeterDefinition as _hello_GreeterDefinition } from './hello/Greeter';
import type { helloReply as _hello_helloReply, helloReply__Output as _hello_helloReply__Output } from './hello/helloReply';
import type { helloRequest as _hello_helloRequest, helloRequest__Output as _hello_helloRequest__Output } from './hello/helloRequest';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  hello: {
    Greeter: SubtypeConstructor<typeof grpc.Client, _hello_GreeterClient> & { service: _hello_GreeterDefinition }
    helloReply: MessageTypeDefinition<_hello_helloReply, _hello_helloReply__Output>
    helloRequest: MessageTypeDefinition<_hello_helloRequest, _hello_helloRequest__Output>
  }
}

