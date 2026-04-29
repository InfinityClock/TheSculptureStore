import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Browser-side Supabase client.
 * Use this in Client Components ('use client') for fetching data,
 * auth, and real-time subscriptions.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Type helpers ──────────────────────────────────────────────────────────────

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string
          price: number
          original_price: number
          discount: number
          rating: number
          reviews_count: number
          image_url: string
          image_urls: string[]
          category: string
          material: string
          sizes: string[]
          badge: string | null
          in_stock: boolean
          featured: boolean
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          subtotal: number
          shipping: number
          discount: number
          payment_method: string
          payment_status: 'pending' | 'paid' | 'failed'
          razorpay_order_id: string | null
          stripe_payment_intent: string | null
          address: Json
          items: Json
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          is_admin: boolean
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      categories: {
        Row: {
          id: string
          label: string
          description: string
          icon: string
          image_url: string
          product_count: number
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          product_id: string
          user_id: string
          rating: number
          review: string
          verified_purchase: boolean
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
    }
  }
}
