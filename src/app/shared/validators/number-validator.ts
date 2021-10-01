import { ExceptionConstants } from '../constants/exception-constants';
import { ObjectValidator } from './object-validator';

export class NumberValidator {
    public static validatePositiveNumber(number: number, argumentsInfo: string): void {
        ObjectValidator.notNullOrUndefinied(number, argumentsInfo);

        if (number <= 0) {
            const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentsInfo);
            throw Error(errorMessage);
        }
    }

    public static validateNonNegativeNumber(number: number, argumentsInfo: string): void {
        ObjectValidator.notNullOrUndefinied(number, argumentsInfo);

        if (number < 0) {
            const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentsInfo);
            throw Error(errorMessage);
        }
    }

    public static validateMax(number: number, maxValue: number, argumentsInfo: string): void {
        if (number > maxValue) {
            const errorMessage = this.appendArgumentName(ExceptionConstants.EXCEEDED_MAX_VALUE, argumentsInfo);
            throw Error(errorMessage);
        }
    }

    // TODO: Reuse
    private static appendArgumentName(errorMessage: string, argumentsInfo: string): string {
        return errorMessage + ` Argument info: ${argumentsInfo}`;
    }
}