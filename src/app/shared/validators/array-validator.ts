import { ObjectValidator } from "./object-validator";
import { StringValidator } from "./string-validator";

export class ArrayValidator {
    public static validateArray<T>(arr: T[], argumentsInfo: string): void {
        ObjectValidator.notNullOrUndefinied(arr, argumentsInfo);

        arr.forEach((element, index) => {
            ObjectValidator.notNullOrUndefinied(element, this.getIndexedArgumentsInfo(argumentsInfo, index));
        });
    }

    public static notEmptyElements(arr: string[], argumentsInfo: string): void {
        arr.forEach((element, index) => {
            StringValidator.notEmty(element, this.getIndexedArgumentsInfo(argumentsInfo, index));
        });
    }

    // TODO: Reuse
    private static getIndexedArgumentsInfo(arrayArgumentsInfo: string, elementIndex: number): string {
        return arrayArgumentsInfo + `[${elementIndex}]`;
    }
}