export const COUPON_CODES ={
    NEWYEAR:"NEWYEAR"
} as const

export type CouponCode = keyof typeof COUPON_CODES