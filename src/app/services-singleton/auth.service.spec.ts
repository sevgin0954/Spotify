import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Token } from "../models/token/token";
import { ExceptionConstants } from "../shared/constants/exception-constants";
import { MainConstants } from "../shared/constants/main-constants";
import { ArgumentsUtilities } from "../test-common/arguments-utilities";
import { Spied } from "../test-common/types";
import { AuthService } from "./auth.service";

describe('', () => {
   
    const BASE_ROUTE: string = 'https://accounts.spotify.com';
    let service: AuthService;
    let http: Spied<HttpClient>;

    beforeEach(() => {
        http = jasmine.createSpyObj(['post']);
        service = new AuthService(http as unknown as HttpClient);
    });

    describe('AuthService', () => {
        it('should be created', () => {
            // Act
            expect(service).toBeTruthy();
        });
    });

    describe('AuthService\s getClientToken', () => {

        it('should call HttClient.post', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(http.post).toHaveBeenCalled();
        });

        it('should call HttClient.post with correct url', () => {
            // Arrange
            const expectedUrl = `${BASE_ROUTE}/api/token`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(http.post, 0);
            expect(calledUrl).toEqual(expectedUrl);
        });

        it('should call HttClient.post with correct body', () => {
            // Arrange
            const expectedBody = `grant_type=client_credentials`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledBody = ArgumentsUtilities.getMostRecentArgument(http.post, 1);
            expect(calledBody).toEqual(expectedBody);
        });

        it('should call HttClient.post with headers with correct Content-Type header', () => {
            // Arrange
            const contentTypeValue = 'application/x-www-form-urlencoded';

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(http.post, 2);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders['Content-Type']).toEqual(contentTypeValue);
        });

        it('should call HttClient.post with headers with correct Authorization header', () => {
            // Arrange
            const authorizationValue = 'Basic ' + btoa(`${MainConstants.CLIENT_ID}:${MainConstants.CLIENT_SECRET}`);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(http.post, 2);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders['Authorization']).toEqual(authorizationValue);
        });

        function callMethodWithDefaultArguments(): Observable<Token> {
            return service.getClientToken();
        }
    });

    describe('AuthService\s getClientToken', () => {

        let code: unknown;
        let redirectUri: unknown;

        beforeEach(() => {
            code = '123';
            redirectUri = 'localhost:4040';
        });

        it('with null code should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            code = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined code should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            code = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with empty code should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.EMPTY_STRING);
            code = '';

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with null redirectUri should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            redirectUri = null;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with undefined redirectUri should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            redirectUri = undefined;

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('with empty redirectUri should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.EMPTY_STRING);
            redirectUri = '';

            // Act

            // Assert
            expect(() => callMethodWithDefaultArguments()).toThrowError(exceptionMessage);
        });

        it('should call HttpClient.post', () => {
            // Arrange

            // Act
            callMethodWithDefaultArguments();

            // Assert
            expect(http.post).toHaveBeenCalled();
        });

        it('should call HttClient.post with headers with correct Content-Type header', () => {
            // Arrange
            const contentTypeValue = 'application/x-www-form-urlencoded';

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(http.post, 2);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders['Content-Type']).toEqual(contentTypeValue);
        });

        it('should call HttClient.post with headers with correct Authorization header', () => {
            // Arrange
            const authorizationValue = 'Basic ' + btoa(`${MainConstants.CLIENT_ID}:${MainConstants.CLIENT_SECRET}`);

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledOptions = ArgumentsUtilities.getMostRecentArgument(http.post, 2);
            const calledHeaders = calledOptions.headers;
            expect(calledHeaders['Authorization']).toEqual(authorizationValue);
        });

        it('should call HttpClient.post with correct url', () => {
            // Arrange
            const expectedUrl = `${BASE_ROUTE}/api/token`;

            // Act
            callMethodWithDefaultArguments();

            // Assert
            const calledUrl = ArgumentsUtilities.getMostRecentArgument(http.post, 0);
            expect(calledUrl).toEqual(expectedUrl);
        });

        function callMethodWithDefaultArguments(): Observable<Token> {
            return service.getUserToken(code as string, redirectUri as string);
        }
    });
});