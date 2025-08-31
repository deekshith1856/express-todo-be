import type { Request, Response, NextFunction } from 'express';
interface ErrorWithStatus extends Error {
    statusCode?: number;
}
export declare const errorHandler: (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => void;
export declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map