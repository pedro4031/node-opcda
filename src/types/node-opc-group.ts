import { DataQuality } from "./qualities.js";

/**
 * Represents a single OPC DA tag/item and its current state.
 */
export interface TagInfo {
    /** 
     * Fully qualified name of the OPC tag/item on the server.
     */
    name: string;

    /**
     * Quality of the tag's value.
     * Must be one of the `DataQuality` enum values:
     * - `DataQuality.Good`
     * - `DataQuality.Uncertain`
     * - `DataQuality.Bad`
     * - and other subtypes like `ConfigError`, `DeviceFailure`, etc.
     */
    quality: DataQuality;

    /**
     * Timestamp of the value, in milliseconds since Unix epoch.
     */
    timestampMs: number;

    /**
     * Current value of the tag.
     * Can be a single number, a string, an array of numbers, an array of strings, or a boolean.
     */
    value: number | string | number[] | string[] | boolean;
}

/** Event callback signatures */
export interface OpcGroupEventMap {
    data_changed: (tagInfo: TagInfo) => void;
    err: (error?: string,data?:string) => void;
    initialized: () => void;
}

/**
 * Class representing an OPC DA group.
 */
export declare class NodeOpcGroup {

    /**
     * Gets the name of the group.
     * @returns Group name
     */
    getName(): string;

    /**
     * Gets the update rate of the group in milliseconds.
     * @returns Update rate in ms
     */
    getUpdateRate(): number;
    
    /**
     * Returns an array of all item names in the group.
     * @returns Array of tag/item names
     */
    getItems(): string[];

    /**
     * Adds a tag/item to the group.
     * @param tagName Name of the tag
     */
    addItem(itemId: string): boolean;

    /**
     * Removes a tag/item from the group.
     * @param tagName Name of the tag
     */
    removeItem(itemId: string): boolean;
    
    /**
     * Adds multiple tags/items to the group.
     * @param itemIds Array of tag/item names
     * @returns Object containing arrays of successfully added and failed items
     */
    addItems(itemIds: string[]): { added: string[]; failed: string[] };

    /**
     * Removes multiple tags/items from the group.
     * @param itemIds Array of tag/item names
     * @returns Object containing arrays of successfully removed and failed items
     */
    removeItems(itemIds: string[]): { removed: string[]; failed: string[] };
    
    /**
     * Subscribes to data changes in this group.
     * @returns True if subscription was successful
     */
    subscribe(): boolean;

    /**
     * Unsubscribes from data changes in this group.
     * @returns True if unsubscription was successful
     */
    unsubscribe(): boolean;
    
    /**
     * Registers an event listener for this group.
     * @param event Event name
     * @param callback Callback to handle the event
     */
    on<K extends keyof OpcGroupEventMap>(event: K, callback: OpcGroupEventMap[K]): void;
    
    /**
     * Terminates the group and frees all associated resources.
     * @returns True if the termination was successful
     */
    terminate(): boolean;
}