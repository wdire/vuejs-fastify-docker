export type CategoryType = {
  id: string
  name: string
  picture: string | null
  parentId: string | null
  created_at: string
  updated_at: string
  children: CategoryType[]
}
