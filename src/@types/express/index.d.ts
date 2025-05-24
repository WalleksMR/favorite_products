declare namespace Express {
  export interface Request {
    service: { id: string; name: string };
  }
}
