import mongoose, { Document } from 'mongoose';
export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITodo, {}, {}, {}, mongoose.Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Todo.d.ts.map