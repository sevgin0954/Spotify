import { Route } from "@angular/compiler/src/core";
import { Observable, of } from "rxjs";
import { CustomPreloadingStrategyService } from "./custom-preloading-strategy.service";

describe('', () => {

    let service: CustomPreloadingStrategyService;

    beforeEach(() => {
        service = new CustomPreloadingStrategyService();
    });

    describe('CustomPreloadingStrategyService', () => {

        it('should be created', () => {
            // Act
            expect(service).toBeTruthy();
        })
    });

    describe('CustomPreloadingStrategyService\s preload method', () => {

        let loadFunc: () => Observable<any>;
        let route;

        let loadFuncReturnValue = {};
        let loadFuncReturnValue$ = of(loadFuncReturnValue);

        beforeEach(() => {
            loadFunc = () => loadFuncReturnValue$;
            route = {};
        });

        it('with route without data property should return null', (done: Function) => {
            // Arrange

            // Act
            let returnedValue;
            callMethodWithDefaultArguments().subscribe(data => {
                returnedValue = data;
                done();
            });

            // Assert
            expect(returnedValue).toEqual(null);
        });

        it('with route.data.preload property equal to false should return null', (done: Function) => {
            // Arrange
            route.data = {};
            route.data.preload = false;

            // Act
            let returnedValue;
            callMethodWithDefaultArguments().subscribe(data => {
                returnedValue = data;
                done();
            });

            // Assert
            expect(returnedValue).toEqual(null);
        });

        it('with route.data.preload property equal to true should return the result from the load function', (done: Function) => {
            // Arrange
            route.data = {};
            route.data.preload = true;

            // Act
            let returnedValue;
            callMethodWithDefaultArguments().subscribe(data => {
                returnedValue = data;
                done();
            });

            // Assert
            expect(returnedValue).toEqual(loadFuncReturnValue);
        });

        function callMethodWithDefaultArguments(): Observable<any> {
            return service.preload(route, loadFunc);
        }
    });
});