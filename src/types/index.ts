export interface User {
  id: number;
  name: string;
  password: string;
  createAt: Date;
  updateAt: Date;
}

interface Moment {
  id?: number;
  content?: string;
  user_id?: number;
  createAt?: Date;
  updateAt?: Date;
}

// 或者更简单地，直接使用数组类型
export type MomentArrayType = Moment[];