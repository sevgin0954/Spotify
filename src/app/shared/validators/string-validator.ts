import { ExceptionConstants } from "../constants/exception-constants";
import { DataValidator } from "./data-validator";

export class StringValidator {
    public static validateString(str: string, argumentsInfo: string): void {
        DataValidator.notNullOrUndefinied(str, argumentsInfo);
        StringValidator.notEmty(str, argumentsInfo);
    }

    public static notEmty(str: string, argumentsInfo: string): void {
        if (str === '') {
            const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_STRING, argumentsInfo);
            throw Error(errorMessage);
        }
    }

    private static appendArgumentName(errorMessage: string, argumentsInfo: string): string {
        return errorMessage + ` Argument info: ${argumentsInfo}`;
    }
}