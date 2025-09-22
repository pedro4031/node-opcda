const addon = require('./node-opcda.node');
import type { OPCDAClient as OPCDAClientType } from './types/index.js';
export const OPCDAClient = addon.OPCDAClient as typeof OPCDAClientType;

export * from './types/qualities.js';