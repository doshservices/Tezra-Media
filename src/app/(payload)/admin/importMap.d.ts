/**
 * Types for Payload's generated importMap.js.
 *
 * Payload regenerates importMap.js on every `payload generate:importmap`, and
 * this project keeps allowJs off, so the generated file needs a declaration
 * rather than being type-checked directly. Declaring it here means the generated
 * file can be overwritten freely without touching tsconfig.
 */
import type { ImportMap } from "payload";

export declare const importMap: ImportMap;
