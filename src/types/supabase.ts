export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          address_line: string
          barangay_id: number
          city_id: number
          created_at: string
          id: number
          postal_code: number
          province_id: number
          region_id: number | null
          updated_at: string | null
        }
        Insert: {
          address_line: string
          barangay_id: number
          city_id: number
          created_at?: string
          id?: number
          postal_code: number
          province_id: number
          region_id?: number | null
          updated_at?: string | null
        }
        Update: {
          address_line?: string
          barangay_id?: number
          city_id?: number
          created_at?: string
          id?: number
          postal_code?: number
          province_id?: number
          region_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "city"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "province"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      barangay: {
        Row: {
          barangay_name: string
          city_id: number
          id: number
        }
        Insert: {
          barangay_name: string
          city_id: number
          id?: number
        }
        Update: {
          barangay_name?: string
          city_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "barangay_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "city"
            referencedColumns: ["id"]
          }
        ]
      }
      brand: {
        Row: {
          created_at: string
          id: number
          img_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          img_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string | null
          name?: string
        }
        Relationships: []
      }
      cart: {
        Row: {
          anonymous_id: string | null
          created_at: string
          id: string
          store_id: string | null
          user_id: string | null
        }
        Insert: {
          anonymous_id?: string | null
          created_at?: string
          id?: string
          store_id?: string | null
          user_id?: string | null
        }
        Update: {
          anonymous_id?: string | null
          created_at?: string
          id?: string
          store_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "cart_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_items: {
        Row: {
          cart_id: string | null
          created_at: string
          id: number
          services_id: number | null
        }
        Insert: {
          cart_id?: string | null
          created_at?: string
          id?: number
          services_id?: number | null
        }
        Update: {
          cart_id?: string | null
          created_at?: string
          id?: number
          services_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_services_id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      category: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          parent_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          parent_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "category_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      city: {
        Row: {
          city_name: string
          id: number
          province_id: number
        }
        Insert: {
          city_name: string
          id?: number
          province_id: number
        }
        Update: {
          city_name?: string
          id?: number
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "city_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "province"
            referencedColumns: ["id"]
          }
        ]
      }
      default_schedule: {
        Row: {
          close_time: string
          day_of_week: number
          id: number
          open_time: string
        }
        Insert: {
          close_time: string
          day_of_week: number
          id?: number
          open_time: string
        }
        Update: {
          close_time?: string
          day_of_week?: number
          id?: number
          open_time?: string
        }
        Relationships: []
      }
      diagnostic: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          title: string | null
          type: Database["public"]["Enums"]["answer_type"] | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          title?: string | null
          type?: Database["public"]["Enums"]["answer_type"] | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          title?: string | null
          type?: Database["public"]["Enums"]["answer_type"] | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string
          id: number
          quantity: number
          threshold: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          quantity?: number
          threshold?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          quantity?: number
          threshold?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      model: {
        Row: {
          brand_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          brand_id?: number | null
          id?: never
          name?: string | null
        }
        Update: {
          brand_id?: number | null
          id?: never
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_public: boolean | null
          is_read: boolean
          notification_type: string
          read_at: string | null
          repair_order_id: string | null
          store_id: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          is_read?: boolean
          notification_type: string
          read_at?: string | null
          repair_order_id?: string | null
          store_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          is_read?: boolean
          notification_type?: string
          read_at?: string | null
          repair_order_id?: string | null
          store_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "repair_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "notifications_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      parts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          part_no: string | null
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          part_no?: string | null
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          part_no?: string | null
          price?: number
        }
        Relationships: []
      }
      product: {
        Row: {
          created_at: string
          description: string | null
          id: number
          img_url: string | null
          price: number
          removed: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          img_url?: string | null
          price?: number
          removed?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          img_url?: string | null
          price?: number
          removed?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      province: {
        Row: {
          id: number
          province_name: string
          region_id: number
        }
        Insert: {
          id?: number
          province_name: string
          region_id: number
        }
        Update: {
          id?: number
          province_name?: string
          region_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "province_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      question_lines: {
        Row: {
          created_at: string
          id: number
          question_id: number | null
          service_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          question_id?: number | null
          service_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          question_id?: number | null
          service_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "question_lines_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_lines_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          created_at: string
          diagnostic_id: number
          id: number
          name: string
          options: Json | null
        }
        Insert: {
          created_at?: string
          diagnostic_id: number
          id?: number
          name: string
          options?: Json | null
        }
        Update: {
          created_at?: string
          diagnostic_id?: number
          id?: number
          name?: string
          options?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostic"
            referencedColumns: ["id"]
          }
        ]
      }
      regions: {
        Row: {
          id: number
          region_code: string
          region_name: string
        }
        Insert: {
          id?: number
          region_code: string
          region_name: string
        }
        Update: {
          id?: number
          region_code?: string
          region_name?: string
        }
        Relationships: []
      }
      repair_order: {
        Row: {
          appointment_date: string | null
          appointment_time: string | null
          arrival_time: string | null
          created_at: string
          id: string
          internal_notes: string | null
          invoice_status: Database["public"]["Enums"]["invoice_status"]
          priority: string | null
          reference_no: number
          status: Database["public"]["Enums"]["repair_order_status"]
          store_id: string
          total_cost: number | null
          updated_at: string | null
          user_id: string
          vehicle_id: string | null
        }
        Insert: {
          appointment_date?: string | null
          appointment_time?: string | null
          arrival_time?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_status?: Database["public"]["Enums"]["invoice_status"]
          priority?: string | null
          reference_no?: number
          status?: Database["public"]["Enums"]["repair_order_status"]
          store_id: string
          total_cost?: number | null
          updated_at?: string | null
          user_id: string
          vehicle_id?: string | null
        }
        Update: {
          appointment_date?: string | null
          appointment_time?: string | null
          arrival_time?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_status?: Database["public"]["Enums"]["invoice_status"]
          priority?: string | null
          reference_no?: number
          status?: Database["public"]["Enums"]["repair_order_status"]
          store_id?: string
          total_cost?: number | null
          updated_at?: string | null
          user_id?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_order_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "repair_order_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          }
        ]
      }
      repair_order_lines: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          price_unit: number | null
          quantity: number
          repair_order_id: string | null
          service_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          price_unit?: number | null
          quantity?: number
          repair_order_id?: string | null
          service_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          price_unit?: number | null
          quantity?: number
          repair_order_id?: string | null
          service_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_order_lines_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_lines_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "repair_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_lines_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      repair_order_parts: {
        Row: {
          created_at: string
          id: number
          name: string
          part_no: string | null
          parts_id: number | null
          price: number
          quantity: number
          repair_order_id: string
          unit_measure: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          part_no?: string | null
          parts_id?: number | null
          price?: number
          quantity?: number
          repair_order_id: string
          unit_measure?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          part_no?: string | null
          parts_id?: number | null
          price?: number
          quantity?: number
          repair_order_id?: string
          unit_measure?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_order_parts_parts_id_fkey"
            columns: ["parts_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_parts_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_parts_repair_order_id_fkey"
            columns: ["repair_order_id"]
            isOneToOne: false
            referencedRelation: "repair_order"
            referencedColumns: ["id"]
          }
        ]
      }
      service_history: {
        Row: {
          created_at: string
          id: number
          is_active: number
          services: string[] | null
          store_id: string | null
          user_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: number
          services?: string[] | null
          store_id?: string | null
          user_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: number
          services?: string[] | null
          store_id?: string | null
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_history_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "service_history_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_history_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          }
        ]
      }
      service_parts: {
        Row: {
          part_id: number
          services_id: number
        }
        Insert: {
          part_id: number
          services_id?: number
        }
        Update: {
          part_id?: number
          services_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_parts_services_id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          id: number
          img_url: string | null
          inclusion: string[] | null
          is_active: boolean | null
          name: string
          price: number
          short_description: string | null
          store_id: string
          unit_measure: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          inclusion?: string[] | null
          is_active?: boolean | null
          name: string
          price?: number
          short_description?: string | null
          store_id: string
          unit_measure?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          inclusion?: string[] | null
          is_active?: boolean | null
          name?: string
          price?: number
          short_description?: string | null
          store_id?: string
          unit_measure?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "services_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          }
        ]
      }
      services_packages: {
        Row: {
          created_at: string | null
          package_id: string
          services_id: string
        }
        Insert: {
          created_at?: string | null
          package_id: string
          services_id: string
        }
        Update: {
          created_at?: string | null
          package_id?: string
          services_id?: string
        }
        Relationships: []
      }
      store: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      store_closed_dates: {
        Row: {
          closed_date: string
          created_at: string
          description: string | null
          id: number
          store_id: string
        }
        Insert: {
          closed_date: string
          created_at?: string
          description?: string | null
          id?: number
          store_id: string
        }
        Update: {
          closed_date?: string
          created_at?: string
          description?: string | null
          id?: number
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_closed_dates_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "store_closed_dates_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          }
        ]
      }
      store_schedule: {
        Row: {
          close_time: string
          created_at: string
          day_of_week: number
          id: number
          interval: number | null
          open_time: string
          store_id: string
          updated_at: string | null
        }
        Insert: {
          close_time: string
          created_at?: string
          day_of_week: number
          id?: number
          interval?: number | null
          open_time: string
          store_id: string
          updated_at?: string | null
        }
        Update: {
          close_time?: string
          created_at?: string
          day_of_week?: number
          id?: number
          interval?: number | null
          open_time?: string
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_schedule_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "order_view"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "store_schedule_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          }
        ]
      }
      sub_category: {
        Row: {
          category_id: number
          created_at: string | null
          id: number
          img_url: string | null
          is_archive: boolean | null
          name: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          id?: number
          img_url?: string | null
          is_archive?: boolean | null
          name: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          id?: number
          img_url?: string | null
          is_archive?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      user_address: {
        Row: {
          address_id: number
          user_id: string
        }
        Insert: {
          address_id: number
          user_id: string
        }
        Update: {
          address_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_address_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_address_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "user_addresses"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "user_address_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_defaults: {
        Row: {
          address_id: number | null
          created_at: string
          id: string
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          address_id?: number | null
          created_at?: string
          id: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          address_id?: number | null
          created_at?: string
          id?: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_defaults_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_defaults_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "user_addresses"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "user_defaults_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_defaults_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          fcm_token: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          notifications_last_read: string | null
          phone: string | null
          updated_at: string | null
          full_name_search: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          middle_name?: string | null
          notifications_last_read?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          notifications_last_read?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle: {
        Row: {
          brand_id: number | null
          created_at: string
          id: string
          model_id: number | null
          plate_no: string | null
          updated_at: string | null
          user_id: string | null
          year_model: string | null
        }
        Insert: {
          brand_id?: number | null
          created_at?: string
          id?: string
          model_id?: number | null
          plate_no?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_model?: string | null
        }
        Update: {
          brand_id?: number | null
          created_at?: string
          id?: string
          model_id?: number | null
          plate_no?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      order_view: {
        Row: {
          appointment_date: string | null
          appointment_time: string | null
          arrival_time: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          internal_notes: string | null
          invoice_status: Database["public"]["Enums"]["invoice_status"] | null
          make: string | null
          model: string | null
          phone: string | null
          plate_no: string | null
          priority: string | null
          reference_no: number | null
          status: Database["public"]["Enums"]["repair_order_status"] | null
          store_id: string | null
          store_name: string | null
          total_cost: number | null
          updated_at: string | null
          user_id: string | null
          vehicle: string | null
          vehicle_id: string | null
          year_model: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_order_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          }
        ]
      }
      user_addresses: {
        Row: {
          address_id: number | null
          address_line: string | null
          barangay_id: number | null
          barangay_name: string | null
          city_id: number | null
          city_name: string | null
          is_default: boolean | null
          postal_code: number | null
          province_id: number | null
          province_name: string | null
          region_id: number | null
          region_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "city"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "province"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_address_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      add_new_address: {
        Args: {
          user_id: string
          region_id: number
          province_id: number
          city_id: number
          barangay_id: number
          postal_code: number
          address_line: string
          is_default: boolean
        }
        Returns: {
          address_id: number | null
          address_line: string | null
          barangay_id: number | null
          barangay_name: string | null
          city_id: number | null
          city_name: string | null
          is_default: boolean | null
          postal_code: number | null
          province_id: number | null
          province_name: string | null
          region_id: number | null
          region_name: string | null
          user_id: string | null
        }[]
      }
      check_notifications: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      count_unread_notifications: {
        Args: {
          user_id_param: string
        }
        Returns: number
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      full_name_search: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      get_closed_dates_for_store: {
        Args: {
          storeid: string
        }
        Returns: {
          closed_date: string
        }[]
      }
      get_high_appointments: {
        Args: Record<PropertyKey, never>
        Returns: {
          disable_date: string
        }[]
      }
      get_notifications: {
        Args: {
          user_id_param: string
        }
        Returns: {
          date: string
          data: Json
        }[]
      }
      get_store_closed_dates: {
        Args: {
          storeid: string
        }
        Returns: unknown
      }
      get_store_fully_book_dates: {
        Args: {
          storeid: string
        }
        Returns: {
          closed_date: string
        }[]
      }
      new_repair_order: {
        Args: {
          user_id: string
          vehicle_id: string
          store_id: string
          appointment_date: string
          appointment_time: string
          services_ids: number[]
        }
        Returns: string
      }
      reset_notification_last_read: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_address: {
        Args: {
          user_id: string
          region_id: number
          province_id: number
          city_id: number
          barangay_id: number
          postal_code: number
          address_line: string
          is_default: boolean
          address_id: number
        }
        Returns: {
          address_id: number | null
          address_line: string | null
          barangay_id: number | null
          barangay_name: string | null
          city_id: number | null
          city_name: string | null
          is_default: boolean | null
          postal_code: number | null
          province_id: number | null
          province_name: string | null
          region_id: number | null
          region_name: string | null
          user_id: string | null
        }[]
      }
    }
    Enums: {
      answer_type: "text" | "image"
      booking_item_status:
        | "PENDING"
        | "IN_PROGRESS"
        | "CANCELLED"
        | "COMPLETED"
        | "WAITING_FOR_PARTS"
      booking_status:
        | "SCHEDULED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "RESCHEDULED"
        | "NOSHOW"
      invoice_status:
        | "paid"
        | "unpaid"
        | "partially"
        | "void"
        | "uncollectible"
        | "draft"
        | "open"
      repair_order_status:
        | "Scheduled"
        | "In Progress"
        | "Awaiting Parts"
        | "Cancelled"
        | "Completed"
      transport_type: "Pick Up" | "Drop Off"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
