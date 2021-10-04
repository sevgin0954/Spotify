import { ExceptionConstants } from "../shared/constants/exception-constants";
import { Spied } from "../test-common/types";
import { WindowService } from "./window.service";

describe('', () => {

    let service: WindowService;

    beforeEach(() => {
        service = new WindowService();
    });

    describe('WindowService', () => {

        it('should be created', () => {
            // Act
            expect(service).toBeTruthy();
        });
    });

    describe('WindowService\s isElementInsideTheScreenVerticaly method', () => {

        it('with null element should throw an exception', () => {
            // Arrange
            const exceptionConstant = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            const element = null;

            // Act

            // Assert
            expect(() => callMethodWithArguments(element)).toThrowError(exceptionConstant);
        });

        it('with overflowing top should return false', () => {
            // Arrange
            const screenHeight = 10;
            spyWindowScreenHeight(screenHeight);

            const top = -1;
            const bottom = 2;
            const element = getSpiedElementBoundingRect({ top, bottom });

            // Act
            const result = callMethodWithArguments(element);

            // Assert
            expect(result).toBeFalsy();
        });

        it('with overflowing bottom should return false', () => {
            // Arrange
            const screenHeight = 10;
            spyWindowScreenHeight(screenHeight);

            const top = 1;
            const bottom = -1;
            const element = getSpiedElementBoundingRect({ top, bottom });

            // Act
            const result = callMethodWithArguments(element);

            // Assert
            expect(result).toBeFalsy();
        });

        it('with overflowing top and bottom should return false', () => {
            // Arrange
            const screenHeight = 10;
            spyWindowScreenHeight(screenHeight);

            const top = -1;
            const bottom = 11;
            const element = getSpiedElementBoundingRect({ top, bottom });

            // Act
            const result = callMethodWithArguments(element);

            // Assert
            expect(result).toBeFalsy();
        });

        it('with not overflowing top and bottom should return true', () => {
            // Arrange
            const screenHeight = 10;
            spyWindowScreenHeight(screenHeight);

            const top = 1;
            const bottom = 2;
            const element = getSpiedElementBoundingRect({ top, bottom });

            // Act
            const result = callMethodWithArguments(element);

            // Assert
            expect(result).toBeTruthy();
        });

        it('with element same height as screen height should return true', () => {
            // Arrange
            const screenHeight = 10;
            spyWindowScreenHeight(screenHeight);

            const top = 0;
            const bottom = 10;
            const element = getSpiedElementBoundingRect({ top, bottom });

            // Act
            const result = callMethodWithArguments(element);

            // Assert
            expect(result).toBeTruthy();
        });

        function spyWindowScreenHeight(screenHeight: number): void {
            spyOnProperty(window, "screen", "get").and.returnValue({
                height: screenHeight
            });
        }

        function getSpiedElementBoundingRect(
            rectObj: { top: number, bottom: number, left?: number, right?: number }
        ): Spied<Element> {
            const element: Spied<Element> = jasmine.createSpyObj(['getBoundingClientRect']);
            element.getBoundingClientRect.and.returnValue(rectObj);

            return element;
        }

        function callMethodWithArguments(element: any): boolean {
            return service.isElementInsideTheScreenVerticaly(element as Element);
        }
    });

    describe('WindowService\s isElementOverflowingParentVerticaly method', () => {

        let parentElement;
        let childElement;

        beforeEach(() => {
            parentElement = { scrollHeight: 1 };
            childElement = { offsetHeight: 1 };
        });

        it('with null child element should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            childElement = null;

            // Act

            // Assert
            expect(() => service.isElementOverflowingParentVerticaly(childElement, parentElement)).toThrowError(exceptionMessage);
        });

        it('with null parent element should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            parentElement = null;

            // Act

            // Assert
            expect(() => service.isElementOverflowingParentVerticaly(childElement, parentElement)).toThrowError(exceptionMessage);
        });

        it('with child element scrollHeight bigger than parent\s offsetHeight should return true', () => {
            // Arrange
            childElement.scrollHeight = 2;
            parentElement.offsetHeight = 1;

            // Act
            const result = service.isElementOverflowingParentVerticaly(childElement, parentElement);

            // Assert
            expect(result).toBeTruthy();
        });

        it('with child element scrollHeight same as parent\s offsetHeight should return false', () => {
            // Arrange
            childElement.scrollHeight = 1;
            parentElement.offsetHeight = 1;

            // Act
            const result = service.isElementOverflowingParentVerticaly(childElement, parentElement);

            // Assert
            expect(result).toBeFalsy();
        });

        it('with child element scrollHeight smaller than parent\s offsetHeight should return false', () => {
            // Arrange
            childElement.scrollHeight = 1;
            parentElement.offsetHeight = 2;

            // Act
            const result = service.isElementOverflowingParentVerticaly(childElement, parentElement);

            // Assert
            expect(result).toBeFalsy();
        });
    });
});