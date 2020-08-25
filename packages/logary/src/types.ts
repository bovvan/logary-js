import { TeardownLogic } from "rxjs"
import { Config } from "./config"
import RuntimeInfo from "./runtimeInfo"
import { Money } from "./money"

export type EventFunction = (event: string, monetaryValueOrError?: Money | Error, ...args: unknown[]) => void

export type IdentifyFunction = (prevUserId: string, nextUserId: string) => void

export type SetUserPropertyFunction = (userId: string, key: string, value: unknown) => void

export interface Runnable {
  run(config: Config, runtimeInfo: RuntimeInfo): TeardownLogic
}

export interface Target extends Runnable {
  readonly name: string;
}

export type KeyValue = Readonly<{ key: string; value: any }>;

export type ErrorInfo = Readonly<{
  colNo?: string | number;
  lineNo?: string | number;
  fileName?: string;
  message?: string;
  stack?: string[];
  path?: string;
}>