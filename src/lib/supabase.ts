import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createClient} from '@supabase/supabase-js'
import {LogBox} from 'react-native'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env'
import {Database} from '#/types/supabase'

LogBox.ignoreLogs([
  '@supabase/gotrue-js: Stack guards not supported in this environment. Generally not an issue but may point to a very conservative transpilation environment (use ES2017 or above) that implements async/await with generators, or this is a JavaScript engine that does not support async/await stack traces. Safari is known to not support stack guards.',
])

const originalWarn = console.warn
console.warn = (message, ...args) => {
  if (message.startsWith('@supabase/gotrue-js')) return
  originalWarn(message, ...args)
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export {supabase}
