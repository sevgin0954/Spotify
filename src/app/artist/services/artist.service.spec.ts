import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Artist } from "../../models/artist/artist";
import { Track } from "../../models/track/track";
import { ExceptionConstants } from "../../shared/constants/exception-constants";
import { RouteConstants } from "../../shared/constants/route-constants";
import { RegionCode } from "../../shared/enums/region-code";
import { ArgumentsUtilities } from "../../test-common/arguments-utilities";
import { Spied } from "../../test-common/types";
import { ArtistService } from "./artist.service";
import { HeadersService } from "../../services-singleton/headers.service";
import { PageArguments } from "src/app/shared/page-arguments";
import { SimplifiedAlbum } from "src/app/models/album/simplified-album";
import { Paging } from "src/app/models/paging/paging";

describe('', () => {

    let service: ArtistService;
    let httpClient: Spied<HttpClient>;
    let headersService: Spied<HeadersService>;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj(['get']);
        headersService = jasmine.createSpyObj(['getClientHeaders']);
        service = new ArtistService(httpClient as unknown as HttpClient, headersService as unknown as HeadersService);
    });

    describe('ArtistService', () => {

        it('should be created', () => {
            // Assert
            expect(service).toBeDefined();
        });
    });

    describe('ArtistService\'s getById', () => {

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
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with empty id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.EMPTY_STRING);
            id = '';

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get method', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const correctUrl = `${RouteConstants.BASE}/artists/${id}`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledUrl).toEqual(correctUrl);
        });

        it('should call HttpClient.get with client headers', () => {
            // Arrange
            const headers = {};
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOtptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(calledOtptions.headers).toEqual(headers);
        });

        function callMethodWithDefaultArguments(): Observable<Artist> {
            return service.getById(id as string);
        }
    });

    describe('ArtistService\'s getTopTracks', () => {
        let id: unknown;
        let regionCode: unknown;

        const tracks = [];
        beforeEach(() => {
            id = '123';
            regionCode = RegionCode.BG;

            const tracks$ = of({
                tracks
            });
            httpClient.get.and.returnValue(tracks$);
        });

        it('with null id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with empty id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.EMPTY_STRING);
            id = '';

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with null regionCode should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            regionCode = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined regionCode should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            regionCode = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get method', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const correctUrl = `${RouteConstants.BASE}/artists/${id}/top-tracks`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledUrl).toEqual(correctUrl);
        });

        it('should call HttpClient.get with client headers', () => {
            // Arrange
            const headers = {};
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOtptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(calledOtptions.headers).toEqual(headers);
        });

        it('should call HttpClient.get with correct region code', () => {
            // Arrange
            const expectedRegionCode = RegionCode.BG;
            regionCode = expectedRegionCode;
            const marketQuery = `market=${RegionCode[expectedRegionCode]}`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOtptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(calledOtptions.params).toMatch(marketQuery);
        });

        it('should return tracks', (done: Function) => {
            // Arrange
            let returnedValue: unknown;

            // Act
            callMethodWithDefaultArguments().subscribe(data => {
                returnedValue = data;
                done();
            });

            // Assert
            expect(returnedValue).toEqual(tracks);
        })

        function callMethodWithDefaultArguments(): Observable<Track[]> {
            return service.getTopTracks(id as string, regionCode as RegionCode);
        }
    });

    describe('ArtistService\'s getAlbums', () => {
        let id: unknown;
        let pageArgs: unknown;

        beforeEach(() => {
            id = '123';
            pageArgs = new PageArguments(2, 1);

            const tracks = [];
            const tracks$ = of({
                tracks
            });
            httpClient.get.and.returnValue(tracks$);
        });

        it('with null id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with null pageArgs should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            pageArgs = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get method', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with client headers', () => {
            // Arrange
            const headers = {};
            headersService.getClientHeaders.and.returnValue(headers);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOtptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(calledOtptions.headers).toEqual(headers);
        });

        it('should call HttpClient.get with correct url', () => {
            // Arrange
            const correctUrl = `${RouteConstants.BASE}/artists/${id}/albums`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledUrl).toEqual(correctUrl);
        });

        it('should call HttpClient.get with correct offset params', () => {
            // Arrange
            const offset = (pageArgs as PageArguments).offset;
            const expectedOffsetKvp = `offset=${offset}`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            const calledParams = calledOptions.params.toString();
            expect(calledParams).toContain(expectedOffsetKvp);
        });

        it('should call HttpClient.get with correct limit params', () => {
            // Arrange
            const offset = (pageArgs as PageArguments).limit;
            const expectedOffsetKvp = `limit=${offset}`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            const calledParams = calledOptions.params.toString();
            expect(calledParams).toContain(expectedOffsetKvp);
        });

        function callMethodWithDefaultArguments(): Observable<Paging<SimplifiedAlbum>> {
            return service.getAlbums(id as string, pageArgs as PageArguments);
        }
    });

    describe('ArtistService\'s getRelatedArtists', () => {

        let id: unknown;
        let artists = [];

        beforeEach(() => {
            id = '123';

            const returnedValue$ = of({
                artists
            });
            httpClient.get.and.returnValue(returnedValue$);
        });

        it('with null id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined id should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            id = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.get', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(httpClient.get).toHaveBeenCalled();
        });

        it('should call HttpClient.get with client headers', () => {
            // Arrange
            const expectedHeaders = {};
            headersService.getClientHeaders.and.returnValue(expectedHeaders);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 1);
            expect(calledOptions.headers).toEqual(expectedHeaders);
        });

        it('should call HtppClient.get with correct url', () => {
            // Arrange
            const expectedUrl = `${RouteConstants.BASE}/artists/${id}/related-artists`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
            expect(calledUrl).toEqual(expectedUrl);
        });

        it('should return artists collection', (done: Function) => {
            // Arrange

            // Act
            let returnedArtists;
            callMethodWithDefaultArguments().subscribe(data => {
                returnedArtists = data;
                done();
            })

            // Assert
            expect(returnedArtists).toEqual(artists);
        });

        function callMethodWithDefaultArguments(): Observable<Artist[]> {
            return service.getRelatedArtists(id as string);
        }
    });
});