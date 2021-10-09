import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { Spied } from "src/app/test-common/types";
import { AlbumService } from "../services/album.service";
import { AlbumComponent } from "./album.component";

describe('', () => {

    let albumService: Spied<AlbumService>;
    let route;

    beforeEach(waitForAsync(() => {
        albumService = jasmine.createSpyObj(['getById']);
        route = {
            get params() { return null }
        };

        TestBed.configureTestingModule({
            declarations: [
                AlbumComponent
            ],
            providers: [
                AlbumComponent,
                {
                    provide: AlbumService, useValue: albumService
                },
                {
                    provide: ActivatedRoute, useValue: route
                }
            ]
        }).compileComponents();
    }));

    describe('Album component', () => {

        let fixture: ComponentFixture<AlbumComponent>;
        let component: AlbumComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumComponent);
            component = fixture.debugElement.componentInstance;
        });

        it('should be created', () => {
            // Assert
            expect(component).toBeTruthy();
        });

        it('should set album$ after ngOnInit is called', () => {
            // Arrange
            const albumId = '123';
            spyOnRouterParams(albumId);

            // Act

            // Assert
            expect(component.album$).toBeUndefined();
            component.ngOnInit();
            expect(component.album$).toBeTruthy();
        });

        it('should set album$ with correct id on ngOnInit', (done: Function) => {
            // Arrange
            const albumId = '123';
            spyOnRouterParams(albumId);
            spyOnAlbumServiceGetById();

            // Act
            let resultAlbum;

            component.ngOnInit();
            component.album$.subscribe(data => {
                resultAlbum = data;
                done();
            });

            // Assert
            expect(resultAlbum.id).toEqual(albumId);
        });

        function spyOnRouterParams(albumId: string): void {
            const params$ = of({
                id: albumId
            });
            spyOnProperty(route, 'params', 'get').and.returnValue(params$);
        }

        function spyOnAlbumServiceGetById(): void {
            albumService.getById.and.callFake((id) => {
                return of({
                    id
                })
            });
        }
    });
});