export function is(type: string) {
  return (value: any) => {
    const vtype = Object.prototype.toString.call(value);
    return `[object ${type.toLowerCase()}]` === vtype.toLowerCase();
  };
}
export const isNumber = (value: unknown): value is number => is('number')(value);
export const isString = (value: unknown): value is string => is('string')(value);
export const isObject = (value: unknown): value is Record<string | number | symbol, unknown> =>
  is('object')(value);
export const isArray = (value: unknown): value is unknown[] => is('array')(value);
export const isFunction = (value: unknown): value is Function => is('function')(value);
export const isUndefined = (value: unknown): value is undefined => is('undefined')(value);
