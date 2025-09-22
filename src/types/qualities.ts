/**
 * Enum representing the quality of an OPC DA tag.
 * Values according to the OPC DA specification.
 */
export enum DataQuality {
     /** Bad quality */
    Bad = 0x00,

    /** Uncertain quality */
    Uncertain = 0x40,

    /** Good quality */
    Good = 0xc0,

    /** Configuration error */
    ConfigError = 0x04,

    /** Not connected */
    NotConnected = 0x08,

    /** Device failure */
    DeviceFailure = 0x0c,

    /** Sensor failure */
    SensorFailure = 0x10,

    /** Last known value */
    LastKnown = 0x14,

    /** Communication failure */
    CommFailure = 0x18,

    /** Out of service */
    OutOfService = 0x1c,

    /** Waiting for initial data */
    WaitingForInitialData = 0x20,

    /** Last usable value */
    LastUsable = 0x44,

    /** Sensor calibration */
    SensorCal = 0x50,

    /** EU exceeded */
    EguExceeded = 0x54,

    /** Sub-normal value */
    SubNormal = 0x58,

    /** Local override */
    LocalOverride = 0xd8
}

/**
 * Enum representing limit flags for OPC DA items.
 */
export enum DataLimit {
    /** Within limits */
    OK = 0x0,

    /** Low limit reached */
    Low = 0x1,

    /** High limit reached */
    High = 0x2,

    /** Constant value */
    Const = 0x3
}

// Bit masks for extracting OPC DA information
const OPC_QUALITY_MASK = 0xc0; // bits 7-6
const OPC_LIMIT_MASK = 0x03;   // bits 1-0

/**
 * Parses an OPC DA quality value and returns its components.
 * @param value The raw OPC quality WORD
 * @returns Object containing main quality, subtypes, and limit
 */
export function parseOpcQuality(value: number) {
    let mainQuality: 'Good' | 'Uncertain' | 'Bad';
    const subtypes: string[] = [];

    // Main quality (bits 7-6)
    const q = value & OPC_QUALITY_MASK;
    switch (q) {
        case DataQuality.Good: mainQuality = 'Good'; break;
        case DataQuality.Uncertain: mainQuality = 'Uncertain'; break;
        case DataQuality.Bad: mainQuality = 'Bad'; break;
        default: mainQuality = 'Bad';
    }

    // Extract subtypes (status bits)
    Object.entries(DataQuality).forEach(([key, val]) => {
        if (typeof val === 'number' && (val & OPC_QUALITY_MASK) === 0 && (value & val) === val) {
            subtypes.push(key);
        }
    });

    // Limit (bits 0-1)
    let limit: 'OK' | 'Low' | 'High' | 'Const';
    switch (value & OPC_LIMIT_MASK) {
        case DataLimit.OK: limit = 'OK'; break;
        case DataLimit.Low: limit = 'Low'; break;
        case DataLimit.High: limit = 'High'; break;
        case DataLimit.Const: limit = 'Const'; break;
        default: limit = 'OK';
    }

    return { quality: mainQuality, subtypes, limit };
}

/**
 * Checks if the given OPC quality is Good
 * @param quality OPC quality value (WORD)
 * @returns True if Good
 */
export function isGoodQuality(quality: number): boolean {
    return (quality & OPC_QUALITY_MASK) === DataQuality.Good;
}

/**
 * Checks if the given OPC quality is Uncertain
 * @param quality OPC quality value (WORD)
 * @returns True if Uncertain
 */
export function isUncertainQuality(quality: number): boolean {
    return (quality & OPC_QUALITY_MASK) === DataQuality.Uncertain;
}

/**
 * Checks if the given OPC quality is Bad
 * @param quality OPC quality value (WORD)
 * @returns True if Bad
 */
export function isBadQuality(quality: number): boolean {
    return (quality & OPC_QUALITY_MASK) === DataQuality.Bad;
}