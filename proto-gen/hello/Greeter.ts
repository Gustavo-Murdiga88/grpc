// Original file: prototypes/hello.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { helloReply as _hello_helloReply, helloReply__Output as _hello_helloReply__Output } from '../hello/helloReply';
import type { helloRequest as _hello_helloRequest, helloRequest__Output as _hello_helloRequest__Output } from '../hello/helloRequest';

export interface GreeterClient extends grpc.Client {
  sayHello(argument: _hello_helloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_helloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_helloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_hello_helloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_helloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_helloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_helloRequest, callback: grpc.requestCallback<_hello_helloReply__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<_hello_helloRequest__Output, _hello_helloReply>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  sayHello: MethodDefinition<_hello_helloRequest, _hello_helloReply, _hello_helloRequest__Output, _hello_helloReply__Output>
}
