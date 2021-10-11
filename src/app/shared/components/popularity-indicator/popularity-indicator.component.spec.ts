import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ExceptionConstants } from "../../constants/exception-constants";
import { PopularityIndicatorComponent } from "./popularity-indicator.component";

describe('PopularityIndicatorComponent', () => {

    let fixture: ComponentFixture<PopularityIndicatorComponent>;
    let component: PopularityIndicatorComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                PopularityIndicatorComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PopularityIndicatorComponent);
        component = fixture.componentInstance;
    }));

    it('should be created', () => {
        // Assert
        expect(component).toBeTruthy();
    });

    it('with negative popularityCount should throw an exception', () => {
        // Arrange
        const exceptionMessage = new RegExp(ExceptionConstants.NUMBER_OUT_OF_RANGE);
        component.popularityCount = -1;

        // Act

        // Assert
        // @ts-ignore
        expect(() => component.ngOnChanges()).toThrowError(exceptionMessage);
    });

    it('with zero popularityCount should throw an exception', () => {
        // Arrange
        const exceptionMessage = new RegExp(ExceptionConstants.NUMBER_OUT_OF_RANGE);
        component.popularityCount = 0;

        // Act

        // Assert
        // @ts-ignore
        expect(() => component.ngOnChanges()).toThrowError(exceptionMessage);
    });

    it('with popularityCount bigger than five should throw an exception', () => {
        // Arrange
        const exceptionMessage = new RegExp(ExceptionConstants.NUMBER_OUT_OF_RANGE);
        component.popularityCount = 6;

        // Act

        // Assert
        // @ts-ignore
        expect(() => component.ngOnChanges()).toThrowError(exceptionMessage);
    });

    [1, 2, 3, 4, 5].forEach(iconCount => {
        it('icons should be equal as the popularityCount', () => {
            // Arrange
            component.popularityCount = iconCount;

            // Act
            fixture.detectChanges();

            // Assert
            const iconElements = fixture.debugElement.nativeElement.querySelectorAll('i');
            expect(iconElements.length).toEqual(iconCount);
        });
    })
});