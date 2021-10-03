import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category/category";
import { Paging } from "../models/paging/paging";
import { ExceptionConstants } from "../shared/constants/exception-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { Category as CategoryEnum } from "../shared/enums/category";
import { ArgumentsUtilities } from "../test-common/arguments-utilities";
import { Spied } from "../test-common/types";
import { CategoryService } from "./category.service";
import { HeadersService } from "./headers.service";

describe('', () => {

    let service: CategoryService;
    let http: Spied<HttpClient>;
    let headersService: Spied<HeadersService>;

    beforeEach(() => {
        http = jasmine.createSpyObj(['get']);
        headersService = jasmine.createSpyObj(['getClientHeaders']);
        service = new CategoryService(http as unknown as HttpClient, headersService as unknown as HeadersService);
    });

    describe('CategoryService', () => {

        it('should be created', () => {
            // Act
            expect(service).toBeTruthy();
        });
    });

    describe('CategoryService\s getCategory', () => {

        let category: unknown;

        beforeEach(() => {
            category = CategoryEnum.ambient;
        });

        it('with null category should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            category = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined category should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            category = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get method', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect();
        });

        it('should call HttpClient.get with client headers', () => {
            // Arrange
            const headers = {};
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(http.get, 1);
            expect(calledOptions.headers).toEqual(headers);
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const categoryName = CategoryEnum[category as CategoryEnum].toLowerCase();
            const expectedUrl = `${RouteConstants.BASE}/browse/categories/${categoryName}`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(http.get, 0);
            expect(calledUrl).toEqual(expectedUrl);
        });

        function callMethodWithDefaultArguments(): Observable<Paging<Category>> {
            return service.getCategory(category as CategoryEnum);
        } 
    });
});