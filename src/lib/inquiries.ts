export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
  mode: 'contact' | 'viewing'
  property?: string
  createdAt: string
}

const STORAGE_KEY = 'horizon:inquiries'

/** Enquiries are stored locally so the flow is complete without a backend.
 *  Replace this with a POST to your CRM or API when one is available. */
export function saveInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>) {
  const record: Inquiry = {
    ...inquiry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const existing: Inquiry[] = raw ? JSON.parse(raw) : []
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]))
  } catch {
    // The confirmation still shows if storage is unavailable.
  }

  return record
}
