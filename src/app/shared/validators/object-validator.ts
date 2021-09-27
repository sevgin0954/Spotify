import { ExceptionConstants } from "../constants/exception-constants";

export class ObjectValidator {
    public static notNullOrUndefinied(data: any, argumentsInfo: string): void {
        if (data == null) {
            const errorMessage = this.appendArgumentName(ExceptionConstants.NULL_OR_UNDEFINED, argumentsInfo);
            throw Error(errorMessage);
        }
    }

    private static appendArgumentName(errorMessage: string, argumentsInfo: string): string {
        return errorMessage + ` Argument info: ${argumentsInfo}`;
    }
}