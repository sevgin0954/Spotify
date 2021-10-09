import { Renderer2 } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { WindowService } from "src/app/services-singleton/window.service";
import { Spied } from "src/app/test-common/types";
import { LoadingElementsComponent } from "./loading-elements.component";

describe('', () => {

    let fixture: ComponentFixture<LoadingElementsComponent>;
    let component: LoadingElementsComponent;

    let windowService: Spied<WindowService>;
    let renderer2: Spied<Renderer2>;

    beforeEach(waitForAsync(() => {
        windowService = jasmine.createSpyObj(['isElementInsideTheScreenVerticaly']);
        renderer2 = jasmine.createSpyObj(['setAttribute', 'removeAttribute']);

        TestBed.configureTestingModule({
            declarations: [
                LoadingElementsComponent
            ],
            providers: [
                LoadingElementsComponent,
                {
                    provide: WindowService, useValue: windowService
                },
                {
                    provide: Renderer2, useValue: renderer2
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingElementsComponent);
        component = fixture.debugElement.componentInstance;
    }));

    describe('LoadingElementsComponent\s ngAfterViewChecked method', () => {

        it('with isLoadingDisabled set to true should add hidden attributes to the loading element', () => {
            // Arrange
            component.isLoadingDisabled = true;
            component.isCurrentlyLoading = false;
            component.loadingCallback = () => {};

            const loadingElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('div');

            // Act
            fixture.detectChanges();

            // Assert
            const hiddenAttributte = loadingElement.attributes.getNamedItem('hidden');
            expect(hiddenAttributte).toBeTruthy();
        });

        it('with isLoadingDisabled set to false should remove hidden attributes from the loading element', () => {
            // Arrange
            component.isLoadingDisabled = false;
            component.isCurrentlyLoading = false;
            component.loadingCallback = () => {};

            const loadingElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('div');
            loadingElement.setAttribute('hidden', 'hidden');

            // Act
            fixture.detectChanges();

            // Assert
            const hiddenAttributte = loadingElement.attributes.getNamedItem('hidden');
            expect(hiddenAttributte).toBeNull();
        });
    });

    describe('LoadingElementsComponent\s onScroll method ', () => {

        it('with isLoadingDisabled set to true should not call loadingCallback', () => {
            // Arrange
            component.isLoadingDisabled = true;

            component.isCurrentlyLoading = false;
            component.loadingCallback = jasmine.createSpy();

            // Act
            fixture.detectChanges();
            component.onScroll();

            // Assert
            expect(component.loadingCallback).not.toHaveBeenCalled();
        });

        it('with isCurrentlyLoading set to true should not call loadingCallback', () => {
            // Arrange
            component.isCurrentlyLoading = true;

            component.isLoadingDisabled = false;
            component.loadingCallback = jasmine.createSpy();

            // Act
            fixture.detectChanges();
            component.onScroll();

            // Assert
            expect(component.loadingCallback).not.toHaveBeenCalled();
        });

        it('with isLoadingDisabled and isCurrentlyLoading set to false ' + 
           'and loading element not visible on the screen should not call loadingCallback', () => {
            // Arrange
            component.isCurrentlyLoading = false;
            component.isLoadingDisabled = false;

            windowService.isElementInsideTheScreenVerticaly.and.returnValue(false);
            component.loadingCallback = jasmine.createSpy();

            // Act
            fixture.detectChanges();
            component.onScroll();

            // Assert
            expect(component.loadingCallback).not.toHaveBeenCalled();
        });

        it('with isLoadingDisabled and isCurrentlyLoading set to false ' + 
           'and loading element visible on the screen should call loadingCallback', () => {
            // Arrange
            component.isCurrentlyLoading = false;
            component.isLoadingDisabled = false;

            windowService.isElementInsideTheScreenVerticaly.and.returnValue(true);
            component.loadingCallback = jasmine.createSpy();

            // Act
            fixture.detectChanges();
            component.onScroll();

            // Assert
            expect(component.loadingCallback).toHaveBeenCalled();
        });
    });
});