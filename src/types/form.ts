export interface StepFormObj {
  courseName?: string
  desc?: string
  difficulty?: number
  price?: number
  isOnline?: boolean
}

export interface StepProps {
  next?: (StepFormObj) => void
  prev?: () => void
  finish?: () => void
  form?: StepFormObj
}
