export interface DynamicObject<T = unknown> {
  [key: string]: T;
};