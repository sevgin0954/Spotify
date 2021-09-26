import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ExceptionConstants } from "../shared/constants/exception-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { ArgumentsUtilities } from "../test-common/arguments-utilities";
import { Spied } from "../test-common/types";
import { AlbumService } from "./album.service";
import { HeadersService } from "./headers.service";

describe('', () => {

    let service: AlbumService;
    let httpClient: Spied<HttpClient>;
    let headersService: Spied<HeadersService>;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj(['get']);
        headersService = jasmine.createSpyObj(['getClientHeaders']);
        service = new AlbumService(httpClient as unknown as HttpClient, headersService as unknown as HeadersService);
    });

    describe('AlbumService', () => {

        it('should be created', () => {
            // Assert
            expect(service).toBeDefined();
        });
    });

    describe('AlbumService\s getById method', () => {
        it('with null id should throw an exception', () => {
            // Arrange
            const errorRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            const id: unknown = null;

            // Act

            // Assert
            expect(() => service.getById(id as string)).toThrowError(errorRegex);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const errorRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            const id: unknown = undefined;

            // Act

            // Assert
            expect(() => service.getById(id as string)).toThrowError(errorRegex);
        });

        it('should call HttpClient.get', () => {
            // Arrange
            const id = '123';

            // Act
            service.getById(id);

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const id = '123';
            const expectedRoute = `${RouteConstants.BASE}/albums/${id}`;

            // Act
            service.getById(id);

            // Assert
            const calledRoute = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledRoute).toEqual(expectedRoute);
        });

        it('should call HttpClient.get with correct client headers', () => {
            // Arrange
            const id = '123';

            const headers = new HttpHeaders();
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            service.getById(id);

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders).toEqual(headers);
        });
    });
});