export const TASK_PRIORITY = {
  LOW: {
    color: 'primary',
    icon: 'tabler-chevron-down',
    text: 'Low',
  },
  MEDIUM: {
    color: 'success',
    icon: 'tabler-menu',
    text: 'Medium',
  },
  HIGH: {
    color: 'error',
    icon: 'tabler-arrow-badge-up',
    text: 'High',
  },
  HIGHEST: {
    color: 'error',
    icon: 'tabler-arrow-badge-up',
    text: 'Highest',
  },
}

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  VALIDATION_ERR: 422,
}

export const ROOM_TYPES = [
  {
    title: 'Phòng trọ',
    value: 'MOTEL',
  },
  {
    title: 'Chung cư',
    value: 'APARTMENT',
  },
  {
    title: 'Nhà nguyên căn',
    value: 'HOUSE',
  },
  {
    title: 'Văn phòng',
    value: 'OFFICE',
  },
]

export const FURNITURE_TYPES = [
  {
    title: 'Không có',
    value: 'NONE',
  },
  {
    title: 'Cơ bản',
    value: 'BASIC',
  },
  {
    title: 'Đầy đủ',
    value: 'FULL',
  },
]

export const POST_STATUSES = {
  PENDING: 'PENDING',
  PUBLISH: 'PUBLISH',
  DRAFT: 'DRAFT',
  REJECTED: 'REJECTED',
}

export type PostStatus = keyof typeof POST_STATUSES
