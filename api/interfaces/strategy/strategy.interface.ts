import * as api from '../../../api';

export interface Strategy {
    _id: string | number;
    name: string;
    description: string;
    createdTime: string;
    isActive: boolean;
    granularity: string;
    postedBy: string | number;
}
