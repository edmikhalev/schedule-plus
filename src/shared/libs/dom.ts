export const toPx = (val: number | string) => `${typeof val === 'string' ? parseInt(val) : val}px`
