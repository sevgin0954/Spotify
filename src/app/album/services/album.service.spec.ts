import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ExceptionConstants } from "../../shared/constants/exception-constants";
import { RouteConstants } from "../../shared/constants/route-constants";
import { ArgumentsUtilities } from "../../test-common/arguments-utilities";
import { Spied } from "../../test-common/types";
import { AlbumService } from "./album.service";
import { HeadersService } from "../../services-singleton/headers.service";
import { SimplifiedAlbum } from '../../models/album/simplified-album';
import { PageArguments } from "../../shared/page-arguments";
import { Track } from "../../models/track/track";
import { Paging } from "../../models/paging/paging";

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
        let id: unknown;

        beforeEach(() => {
            id = '123';
        });

        it('with null id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = null;

            // Act

            // Assert
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act

            // Assert
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get', () => {
            // Arrange

            // Act
            callServiceWithDefaultArguments();

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const expectedRoute = `${RouteConstants.BASE}/albums/${id}`;

            // Act
            callServiceWithDefaultArguments();

            // Assert
            const calledRoute = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledRoute).toEqual(expectedRoute);
        });

        it('should call HttpClient.get with correct client headers', () => {
            // Arrange

            const headers = new HttpHeaders();
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callServiceWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders).toEqual(headers);
        });

        function callServiceWithDefaultArguments(): Observable<SimplifiedAlbum> {
            return service.getById(id as string);
        }
    });

    describe('AlbumService\s getTracks method', () => {

        let id: unknown;
        let pageArguments: PageArguments | null | undefined;

        let tracks = [];
        const httpClientGetReturnValue = of({
            tracks
        });

        beforeEach(() => {
            id = '123';
            pageArguments = new PageArguments(1, 1);
            httpClient.get.and.returnValue(httpClientGetReturnValue);
        });

        it('with null albumId should throw an exception', () => {
            // Assert
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = null;

            // Act


            // Arrange
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with emppty string albumId should throw an exception', () => {
            // Assert
            const exceptionMessage = new RegExp(ExceptionConstants.EMPTY_STRING);
            id = '';

            // Act


            // Arrange
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined albumId should throw an exception', () => {
            // Assert
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act


            // Arrange
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with null pageArguments should throw an exception', () => {
            // Assert
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            pageArguments = null;

            // Act


            // Arrange
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined pageArguments should throw an exception', () => {
            // Assert
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            pageArguments = undefined;

            // Act


            // Arrange
            expect(() => callServiceWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get', () => {
            // Assert

            // Act
            callServiceWithDefaultArguments();

            // Arrange
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with correct url', () => {
            // Assert
            const correctUrl = `${RouteConstants.BASE}/albums/${id}/tracks`;

            // Act
            callServiceWithDefaultArguments();

            // Arrange
            const getUrlArguments = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(getUrlArguments).toEqual(correctUrl);
        });

        it('should call HttpClient.get with client headers', () => {
            // Assert
            const headers = {};
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callServiceWithDefaultArguments();

            // Arrange
            const optionsArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(optionsArgument.headers).toEqual(headers);
        });

        it('should call HttpClient.get with params with the correct limit', () => {
            // Assert
            const limitParam = `limit=${pageArguments?.limit}`;

            // Act
            callServiceWithDefaultArguments();

            // Arrange
            const optionsArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(optionsArgument.params.toString()).toContain(limitParam);
        });

        it('should call HttpClient.get with params with the correct offset', () => {
            // Assert
            const limitParam = `offset=${pageArguments?.offset}`;

            // Act
            callServiceWithDefaultArguments();

            // Arrange
            const optionsArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(optionsArgument.params.toString()).toContain(limitParam);
        });

        it('should return tracks', (done: Function) => {
            // Assert
            let returnedData: unknown;

            // Act
            callServiceWithDefaultArguments().subscribe(data => {
                returnedData = data;
                done();
            });

            // Arrange
            expect(returnedData).toEqual(tracks);
        });

        function callServiceWithDefaultArguments(): Observable<Paging<Track>> {
            return service.getTracks(id as string, pageArguments as PageArguments);
        }
    });
});