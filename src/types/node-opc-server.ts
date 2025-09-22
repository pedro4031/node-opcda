import {NodeOpcGroup } from './node-opc-group.js'

/**
 * Configuration object for `NodeOpcServer`.
 */
export interface OpcServerConfig {
    connectionStrategy?: {
        /** Initial delay before retrying (ms) */
        initialDelay?: number;
        /** Maximum number of retries */
        maxRetry?: number;
    };
    // Add any other top-level configuration properties here
}

/** List of supported events for NodeOpcServer */
export type OpcServerEvents =
    | 'connection_established'
    | 'connection_failed'
    | 'connection_lost'
    | 'connection_reestablished'
    | 'error'
    | 'after_reconnection'
    | 'disconnection'
    | 'start_reconnection';

/**
 * Class representing an OPC DA client.
 */
export declare class NodeOpcServer {
    /**
     * Creates a new OPC DA server client.
     * @param config Optional configuration for connection retries and strategy.
     */
    constructor(config?: OpcServerConfig);

    connect(progId: string): boolean;
    disconnect(): void;
    isConnected(): boolean;
    
    /**
     * Creates a new OPC DA group on the client.
     * @param name Name of the group
     * @param updateRateMs Update interval in ms (optional)
     * @returns An instance of `NodeOpcGroup`
     */
    createGroup(groupName: string, updateRate: number): NodeOpcGroup;

    /**
     * Removes a group from the client.
     * @param groupName Name of the group
     * @returns true if removed successfully, false otherwise
     */
    removeGroup(groupName: string): boolean;

    /**
     * Checks if the server is alive and responding.
     * @returns true if healthy, false otherwise
     */
    healthCheck(): boolean;

    /**
     * Returns an array of all available tags on the server.
     * @returns Array of strings containing the full tag names
     */
    browseTags(): string[];

    /**
 * Subscribes to server events.
 * 
 * Supported events:
 * - `connection_established`: Fired when the client successfully connects.
 * - `connection_failed`: Fired when the client fails to connect.
 * - `connection_lost`: Fired when an established connection is lost.
 * - `connection_reestablished`: Fired when a lost connection is reestablished.
 * - `error`: Fired on a general error. The `error` string contains details.
 * - `after_reconnection`: Fired after an automatic reconnection attempt finishes.
 * - `disconnection`: Fired when the client disconnects intentionally.
 * - `start_reconnection`: Fired when an automatic reconnection attempt begins.
 * 
 * @param eventName Name of the event to subscribe to. Must be one of `OpcServerEvents`.
 * @param callback Callback function called when the event occurs.
 *                 - `error` parameter contains error details if any.
 *                 - `data` parameter may contain additional information (optional).
 */
    on(eventName: OpcServerEvents, callback: (error?: string, data?: string) => void): void;
}