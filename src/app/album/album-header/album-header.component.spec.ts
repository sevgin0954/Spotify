import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of, Subject } from "rxjs";
import { SimplifiedAlbum } from "src/app/models/album/simplified-album";
import { SimplifiedArtist } from "src/app/models/artist/simplified-artist";
import { FallowAlbumService } from "src/app/services-singleton/fallow-album.service";
import { LocalStorageService } from "src/app/services-singleton/local-storage.service";
import { ExceptionConstants } from "src/app/shared/constants/exception-constants";
import { Spied } from "src/app/test-common/types";
import { AlbumHeaderComponent } from "./album-header.component";

describe('', () => {

    let fixture: ComponentFixture<AlbumHeaderComponent>;
    let component: AlbumHeaderComponent;

    let localStorageService: Spied<LocalStorageService>;
    let fallowService: Spied<FallowAlbumService>;

    beforeEach(waitForAsync(() => {
        localStorageService = jasmine.createSpyObj(['getUserToken']);
        fallowService = jasmine.createSpyObj(['checkIfUserIsFallowingAlbum', 'unfallow', 'fallow']);

        TestBed.configureTestingModule({
            declarations: [
                AlbumHeaderComponent
            ],
            providers: [
                AlbumHeaderComponent,
                {
                    provide: LocalStorageService, useValue: localStorageService
                },
                {
                    provide: FallowAlbumService, useValue: fallowService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlbumHeaderComponent);
        component = fixture.debugElement.componentInstance;
    }));

    describe('AlbumHeaderComponent', () => {

        it('should be created', () => {
            // Assert
            expect(component).toBeTruthy();
        });
    });

    describe('AlbumHeaderComponent ngOnChanges', () => {

        beforeEach(() => {
            const albumId = '123';
            initializeAlbum(albumId);
        });

        it('with logged in user should call fallowService.checkIfUserIsFallowingAlbum', () => {
            // Arrange
            initializeLoggedInUser('123');

            fallowService.checkIfUserIsFallowingAlbum.and.returnValue(of(true));

            // Act
            component.ngOnChanges();

            // Assert
            expect(fallowService.checkIfUserIsFallowingAlbum).toHaveBeenCalled();
        });

        it('with logged in user who is fallowing the album should set isUserFallowing to true', () => {
            // Arrange
            const isUserLoggedIn = true;
            fallowService.checkIfUserIsFallowingAlbum.and.returnValue(of(isUserLoggedIn));

            initializeLoggedInUser('123');

            // Act
            component.ngOnChanges();

            // Assert
            expect(component.isUserFallowing).toBeTruthy();
        });

        it('with logged in user who is not fallowing the album should set isUserFallowing to false', () => {
            // Arrange
            const isUserLoggedIn = false;
            fallowService.checkIfUserIsFallowingAlbum.and.returnValue(of(isUserLoggedIn));

            initializeLoggedInUser('123');

            // Act
            component.ngOnChanges();

            // Assert
            expect(component.isUserFallowing).toBeFalsy();
        });

        it('without logged in user should not call fallowService.checkIfUserIsFallowingAlbum', () => {
            // Arrange

            // Act
            component.ngOnChanges();

            // Assert
            expect(fallowService.checkIfUserIsFallowingAlbum).toHaveBeenCalledTimes(0);
        });

        it('without logged in user should set isUserFallowing to false', () => {
            // Arrange

            // Act
            component.ngOnChanges();

            // Assert
            expect(component.isUserFallowing).toBeFalsy();
        });

        function initializeLoggedInUser(userToken: string): void {
            localStorageService.getUserToken.and.returnValue(userToken);
        }
    });

    describe('AlbumHeaderComponent setLoadedImage', () => {

        it('with null image should throw an exception', () => {
            // Arrange
            const exceptionMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
            const image: HTMLImageElement = null as unknown as HTMLImageElement;

            // Act

            // Assert
            expect(() => component.setLoadedImage(image)).toThrowError(exceptionMessage);
        });

        it('should set loadedImage to the given image', () => {
            // Arrange
            const image = createImage('http:123');

            // Act
            component.setLoadedImage(image);

            // Assert
            expect(component.loadedImage).toEqual(image);
        });

        it('should set imageUrl to the given image currentSrc', () => {
            // Arrange
            const currentSrc = 'http:123';
            const image = createImage(currentSrc);

            // Act
            component.setLoadedImage(image);

            // Assert
            expect(component.imageUrl).toEqual(currentSrc);
        });

        function createImage(currentSrc: string): HTMLImageElement {
            const image = {
                currentSrc
            };

            return image as HTMLImageElement;
        }
    });

    describe('AlbumHeaderComponent unfallow', () => {

        it('should call FallowService.unfallow with album id', () => {
            // Arrange
            const albumId = '123';
            initializeAlbum(albumId);
            fallowService.unfallow.and.returnValue(of(true));

            // Act
            component.unfallow();

            // Assert
            expect(fallowService.unfallow).toHaveBeenCalledWith(albumId);
        });

        it('if successful should set isUserFallowing to false', () => {
            // Arrange
            const albumId = '123';
            initializeAlbum(albumId);
            fallowService.unfallow.and.returnValue(of(true));

            // Act
            component.unfallow();

            // Assert
            expect(component.isUserFallowing).toBeFalse();
        });

        it('if not successful should not alter isUserFallowing', () => {
            // Arrange
            const albumId = '123';
            initializeAlbum(albumId);

            component.isUserFallowing = true;

            const subject = new Subject();
            fallowService.unfallow.and.returnValue(subject);

            // Act
            component.unfallow();
            subject.error('a');

            // Assert
            expect(component.isUserFallowing).toBeTruthy();
        });
    });

    describe('AlbumHeaderComponent html', () => {

        let defaultAlbum: SimplifiedAlbum;

        beforeEach(() => {
            defaultAlbum = {
                name: '123',
                images: [{ url: 'http:123' }],
                release_date: '1999-05-20'
            } as any;
        });

        it('should display correct h1 title', () => {
            // Arrange
            component.album = defaultAlbum;
            const h1Element = fixture.debugElement.nativeElement.querySelector('h1');

            // Act
            fixture.detectChanges();

            // Assert
            expect(h1Element.innerText).toContain(defaultAlbum.name);
        });

        it('should display correct album realease data', () => {
            // Arrange
            component.album = defaultAlbum;

            // Act
            fixture.detectChanges();

            // Assert
            expect(fixture.debugElement.nativeElement.innerText).toContain(defaultAlbum.release_date);
        });

        it('with single artist should display artist name without ,', () => {
            // Arrange
            const artist1 = { id: '123', name: 'artist1' } as SimplifiedArtist;
            defaultAlbum.artists = [artist1];

            component.album = defaultAlbum;

            const bottomInfoElement = fixture.debugElement.query(By.css('.bottom-row-info'));

            // Act
            fixture.detectChanges();

            // Assert
            expect(bottomInfoElement.nativeElement.innerText).toContain(artist1.name);
            expect(bottomInfoElement.nativeElement.innerText).not.toContain(',');
        });

        it('with multiple artists should display artists names separated by a ,', () => {
            // Arrange
            const artist1 = { id: '123', name: 'artist1' } as SimplifiedArtist;
            const artist2 = { id: '345', name: 'artist2' } as SimplifiedArtist;
            defaultAlbum.artists = [artist1, artist2];

            component.album = defaultAlbum;

            const bottomInfoElement = fixture.debugElement.query(By.css('.bottom-row-info'));

            // Act
            fixture.detectChanges();

            // Assert
            expect(bottomInfoElement.nativeElement.innerText).toContain(`${artist1.name}, ${artist2.name}`);
        });

        it('should display correct track count', () => {
            // Arrange
            const totalTracks = 1;
            defaultAlbum.total_tracks = totalTracks;

            component.album = defaultAlbum;

            // Act
            fixture.detectChanges();

            // Assert
            expect(fixture.nativeElement.innerText).toContain(`${totalTracks} songs`);
        });

        it('with not set isUserFallowing should not display heart icon', () => {
            // Arrange
            component.album = defaultAlbum;

            // Act
            fixture.detectChanges();

            // Assert
            expect(fixture.nativeElement.innerHTML).not.toContain('app-like');
        });

        it('with set isUserFallowing should display heart icon', () => {
            // Arrange
            component.album = defaultAlbum;
            component.isUserFallowing = true;

            // Act
            fixture.detectChanges();

            // Assert
            expect(fixture.nativeElement.innerHTML).toContain('app-like');
        });
    });

    function initializeAlbum(id: string): void {
        const album: SimplifiedAlbum = {
            id
        } as SimplifiedAlbum;
        component.album = album;
    }
});