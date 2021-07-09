import { DynamicObject} from './general';

export interface Grade {
  hours: number
  name: string
};

export interface TrailResume {
  description: string,
  id: string,
  image: string,
  name: string
};

export interface TrailGrade {
  createdAt: string,
  hours: number,
  id: string,
  name: string
}
