import { ExceptionConstants } from "./constants/exception-constants";
import { NumberValidator } from "./validators/number-validator";

export class PageArguments {

    private _offset: number;
    private _limit: number;

    constructor(
        limit: number,
        offset: number = 0
    ) {
        if (offset > limit){
            throw Error(ExceptionConstants.OFFSET_BIGGER_THAN_LIMIT);
        }
        
        this.offset = offset;
        this.limit = limit;
    }

    get offset(): number {
        return this._offset;
    }

    set offset(offset: number) {
        NumberValidator.validateNonNegativeNumber(offset, 'offset');
        this._offset = offset;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(limit: number) {
        NumberValidator.validatePositiveNumber(limit, 'limit');
        this._limit = limit;
    }
} 