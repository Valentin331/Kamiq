import { KamiqError } from "../KamiqError.class";

export class InvalidArgumentError extends KamiqError {
    constructor(message?: string, suggestion?: string) {
        super('InvalidArgumentError', message as string, suggestion); // TODO: cast hack!
    }
}