import { NodeOpcServer } from "./node-opc-server.js";

/**
 * Configuration options for creating an OPC DA client.
 */
export interface OpcClientConfig {
  /**
   * Reconnection strategy in case of disconnection.
   */
  connectionStrategy?: {
    /** Initial delay before retrying (ms) */
    initialDelay?: number;
    /** Maximum number of retries */
    maxRetry?: number;
  };
}

/**
 * Main class representing an OPC DA client.
 * Provides a static `create` method to initialize the connection.
 */
export declare class OPCDAClient {

  /**
   * Creates a `NodeOpcServer` instance configured according to `OpcClientConfig`.
   * @param config Optional connection configuration
   * @returns An instance of `NodeOpcServer`
   */
  static create(config: OpcClientConfig): NodeOpcServer;
}
