export type ShippingMethod = 'standard' | 'express'

export const FREE_SHIPPING_THRESHOLD = 999

export function calculateShipping(subtotal: number, method: ShippingMethod = 'standard'): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return method === 'express' ? 249 : 149
}
