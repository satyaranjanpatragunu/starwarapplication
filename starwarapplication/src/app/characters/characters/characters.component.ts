import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwapiservicefetchService } from '../../sharedservice/swapiservicefetch.service';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-characters',
    imports: [MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, RouterLink],
    templateUrl: './characters.component.html',
    styleUrl: './characters.component.css'
})
export class CharactersComponent {
    // constructor(private myservice:SwapiservicefetchService, private route: ActivatedRoute){}
    private myservice = inject(SwapiservicefetchService);
    private http = inject(HttpClient);
    header = "STAR WARS"
    header2 = "THE SWAPI PROJECT"
    filtertext = "FILTERS"
    search = "SEARCH RESULTS"
    allitterabledata: any;
    alldata: any[] = [];
    presentalldata: any[] = [];       // All records from API
    paginatedData: any[] = [];
    maximumddatainpage = 5;
    currentpage = 0
    alldatarespnse: any;
    allrolespecies: any;
    species: any;
    nameofspecies: any;
    dropdownmovies: any;
    dropdownstartship: any;
    dropdownspecies: any;
    dropdownvehicle: any;
    dropdownvaluesmoviess: any[] = [];
    filteredData: any[] = [];
    ngOnInit() {
        console.log("ngoninitcalled")
        this.myservice.allpeopledata().subscribe({
            next: data => {
                this.alldatarespnse = data;
                this.setData();
            }, error: (err) => {
                console.log(err);
            }
        })
        // this.alldatarespnse = {
        //     "count": 82,
        //     "next": "https://swapi.dev/api/people/?page=2",
        //     "previous": null,
        //     "results": [
        //         {
        //             "name": "Luke Skywalker",
        //             "height": "172",
        //             "mass": "77",
        //             "hair_color": "blond",
        //             "skin_color": "fair",
        //             "eye_color": "blue",
        //             "birth_year": "19BBY",
        //             "gender": "male",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [
        //                 "https://swapi.dev/api/vehicles/14/",
        //                 "https://swapi.dev/api/vehicles/30/"
        //             ],
        //             "starships": [
        //                 "https://swapi.dev/api/starships/12/",
        //                 "https://swapi.dev/api/starships/22/"
        //             ],
        //             "created": "2014-12-09T13:50:51.644000Z",
        //             "edited": "2014-12-20T21:17:56.891000Z",
        //             "url": "https://swapi.dev/api/people/1/"
        //         },
        //         {
        //             "name": "C-3PO",
        //             "height": "167",
        //             "mass": "75",
        //             "hair_color": "n/a",
        //             "skin_color": "gold",
        //             "eye_color": "yellow",
        //             "birth_year": "112BBY",
        //             "gender": "n/a",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/4/",
        //                 "https://swapi.dev/api/films/5/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [
        //                 "https://swapi.dev/api/species/2/"
        //             ],
        //             "vehicles": [],
        //             "starships": [],
        //             "created": "2014-12-10T15:10:51.357000Z",
        //             "edited": "2014-12-20T21:17:50.309000Z",
        //             "url": "https://swapi.dev/api/people/2/"
        //         },
        //         {
        //             "name": "R2-D2",
        //             "height": "96",
        //             "mass": "32",
        //             "hair_color": "n/a",
        //             "skin_color": "white, blue",
        //             "eye_color": "red",
        //             "birth_year": "33BBY",
        //             "gender": "n/a",
        //             "homeworld": "https://swapi.dev/api/planets/8/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/4/",
        //                 "https://swapi.dev/api/films/5/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [
        //                 "https://swapi.dev/api/species/2/",
        //                 "https://swapi.dev/api/species/3/",
        //                 "https://swapi.dev/api/species/4/"
        //             ],
        //             "vehicles": ["https://swapi.dev/api/vehicles/30/", "https://swapi.dev/api/vehicles/1/"],
        //             "starships": ["https://swapi.dev/api/starships/13/", "https://swapi.dev/api/starships/30/"],
        //             "created": "2014-12-10T15:11:50.376000Z",
        //             "edited": "2014-12-20T21:17:50.311000Z",
        //             "url": "https://swapi.dev/api/people/3/"
        //         },
        //         {
        //             "name": "Darth Vader",
        //             "height": "202",
        //             "mass": "136",
        //             "hair_color": "none",
        //             "skin_color": "white",
        //             "eye_color": "yellow",
        //             "birth_year": "41.9BBY",
        //             "gender": "male",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [],
        //             "starships": [
        //                 "https://swapi.dev/api/starships/13/"
        //             ],
        //             "created": "2014-12-10T15:18:20.704000Z",
        //             "edited": "2014-12-20T21:17:50.313000Z",
        //             "url": "https://swapi.dev/api/people/4/"
        //         },
        //         {
        //             "name": "Leia Organa",
        //             "height": "150",
        //             "mass": "49",
        //             "hair_color": "brown",
        //             "skin_color": "light",
        //             "eye_color": "brown",
        //             "birth_year": "19BBY",
        //             "gender": "female",
        //             "homeworld": "https://swapi.dev/api/planets/2/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [
        //                 "https://swapi.dev/api/vehicles/30/"
        //             ],
        //             "starships": [],
        //             "created": "2014-12-10T15:20:09.791000Z",
        //             "edited": "2014-12-20T21:17:50.315000Z",
        //             "url": "https://swapi.dev/api/people/5/"
        //         },
        //         {
        //             "name": "Owen Lars",
        //             "height": "178",
        //             "mass": "120",
        //             "hair_color": "brown, grey",
        //             "skin_color": "light",
        //             "eye_color": "blue",
        //             "birth_year": "52BBY",
        //             "gender": "male",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/5/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [],
        //             "starships": [],
        //             "created": "2014-12-10T15:52:14.024000Z",
        //             "edited": "2014-12-20T21:17:50.317000Z",
        //             "url": "https://swapi.dev/api/people/6/"
        //         },
        //         {
        //             "name": "Beru Whitesun lars",
        //             "height": "165",
        //             "mass": "75",
        //             "hair_color": "brown",
        //             "skin_color": "light",
        //             "eye_color": "blue",
        //             "birth_year": "47BBY",
        //             "gender": "female",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/5/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [],
        //             "starships": [],
        //             "created": "2014-12-10T15:53:41.121000Z",
        //             "edited": "2014-12-20T21:17:50.319000Z",
        //             "url": "https://swapi.dev/api/people/7/"
        //         },
        //         {
        //             "name": "R5-D4",
        //             "height": "97",
        //             "mass": "32",
        //             "hair_color": "n/a",
        //             "skin_color": "white, red",
        //             "eye_color": "red",
        //             "birth_year": "unknown",
        //             "gender": "n/a",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/"
        //             ],
        //             "species": [
        //                 "https://swapi.dev/api/species/2/"
        //             ],
        //             "vehicles": [],
        //             "starships": [],
        //             "created": "2014-12-10T15:57:50.959000Z",
        //             "edited": "2014-12-20T21:17:50.321000Z",
        //             "url": "https://swapi.dev/api/people/8/"
        //         },
        //         {
        //             "name": "Biggs Darklighter",
        //             "height": "183",
        //             "mass": "84",
        //             "hair_color": "black",
        //             "skin_color": "light",
        //             "eye_color": "brown",
        //             "birth_year": "24BBY",
        //             "gender": "male",
        //             "homeworld": "https://swapi.dev/api/planets/1/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/"
        //             ],
        //             "species": [],
        //             "vehicles": [],
        //             "starships": [
        //                 "https://swapi.dev/api/starships/12/"
        //             ],
        //             "created": "2014-12-10T15:59:50.509000Z",
        //             "edited": "2014-12-20T21:17:50.323000Z",
        //             "url": "https://swapi.dev/api/people/9/"
        //         },
        //         {
        //             "name": "Obi-Wan Kenobi",
        //             "height": "182",
        //             "mass": "77",
        //             "hair_color": "auburn, white",
        //             "skin_color": "fair",
        //             "eye_color": "blue-gray",
        //             "birth_year": "57BBY",
        //             "gender": "male",
        //             "homeworld": "https://swapi.dev/api/planets/20/",
        //             "films": [
        //                 "https://swapi.dev/api/films/1/",
        //                 "https://swapi.dev/api/films/2/",
        //                 "https://swapi.dev/api/films/3/",
        //                 "https://swapi.dev/api/films/4/",
        //                 "https://swapi.dev/api/films/5/",
        //                 "https://swapi.dev/api/films/6/"
        //             ],
        //             "species": [],
        //             "vehicles": [
        //                 "https://swapi.dev/api/vehicles/38/"
        //             ],
        //             "starships": [
        //                 "https://swapi.dev/api/starships/48/",
        //                 "https://swapi.dev/api/starships/59/",
        //                 "https://swapi.dev/api/starships/64/",
        //                 "https://swapi.dev/api/starships/65/",
        //                 "https://swapi.dev/api/starships/74/"
        //             ],
        //             "created": "2014-12-10T16:16:29.192000Z",
        //             "edited": "2014-12-20T21:17:50.325000Z",
        //             "url": "https://swapi.dev/api/people/10/"
        //         }
        //     ]
        // };


        // }})
        // this.servicecall();    


    }

    currentPage = 1;
    pageSize = 5;
    totalPages = 0;
    setData() {
        this.alldata = this.alldatarespnse.results;
        this.presentalldata = [...this.alldata];
        this.dropdownvaluefilm();
        this.dropdownvaluespecies();
        this.dropdownvaluevehicle();
        this.dropdownvaluestartship();
        this.alldata.forEach((character: any) => {
            this.getSpeciesNames(character);
        });
        this.totalPages = Math.ceil(
            this.alldata.length / this.pageSize
        );

        this.currentPage = 1;
        this.updatePage();
    }
    getSpeciesNames(character: any) {
        character.speciesNames = [];

        character.species.forEach((url: string) => {
            this.http.get<any>(url).subscribe({
                next: (data) => {
                    character.speciesNames.push(data.name);
                },
                error: (err) => console.error(err)
            });
        });
    }
    // servicecall(){
    // this.myservice.allpeopledata().subscribe({next:data=>{
    //         this.alldatarespnse=data;
    //         this.setData()
    //   },error:(err)=>{
    //     console.log(err);
    //   }})
    // }
    updatePage() {
        const startIndex = (this.currentPage - 1) * this.pageSize;

        this.paginatedData = this.presentalldata.slice(
            startIndex,
            startIndex + this.pageSize
        );
    }
    dropdownvaluesmovies: any[] = [];
    dropdownvaluefilm() {
        this.myservice.allmoviesnamedropdown().subscribe({
            next: (data: any) => {
                this.dropdownmovies = data.results;

                this.dropdownvaluesmovies = this.dropdownmovies.map(
                    (character: any) => character.title
                );

                console.log(this.dropdownvaluesmovies);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    dropdownvaluesvehicle: any[] = [];
    dropdownvaluevehicle() {
        this.myservice.allvehiclenamedropdown().subscribe({
            next: data => {
                this.dropdownvehicle = data.results;
                this.dropdownvaluesvehicle = this.dropdownvehicle.map(
                    (character: any) => character.name
                );
            }, error: (err) => {
                console.log(err);
            }
        })
    }
    dropdownvaluesstartship: any[] = [];
    dropdownvaluestartship() {
        this.myservice.allstarshipsnamedropdown().subscribe({
            next: data => {
                console.log(data);
                this.dropdownstartship = data.results;
                this.dropdownvaluesstartship = this.dropdownstartship.map(
                    (character: any) => character.name
                );
                console.log(data)
            }, error: (err) => {
                console.log(err);
            }
        })
    }

    // filterByVehicle() {
    //     console.log("it is triggered")
    //     const selectedvehicle = this.selectedFilters['vehicles'] ?? [];

    //     if (selectedvehicle.length === 0) {
    //         this.presentalldata = [...this.alldata];
    //     } else {
    //         const selectedUrls = this.dropdownvehicle
    //             .filter((vehicles: any) => selectedvehicle.includes(vehicles.name))
    //             .map((vehicles: any) => vehicles.url);

    //         this.presentalldata = this.alldata.filter((character: any) =>
    //             (character.vehicles ?? []).some((url: string) =>
    //                 selectedUrls.includes(url)
    //             )
    //         );
    //     }
    //     console.log(this.alldata);
    //     this.currentPage = 1;
    //     this.updatePage();
    // }
    // filterBySpecies() {
    //     console.log("it is triggered")
    //     const selectedSpecies = this.selectedFilters['species'] ?? [];

    //     if (selectedSpecies.length === 0) {
    //         this.presentalldata = [...this.alldata];
    //     } else {
    //         const selectedUrls = this.dropdownspecies
    //             .filter((species: any) => selectedSpecies.includes(species.name))
    //             .map((species: any) => species.url);

    //         this.presentalldata = this.alldata.filter((character: any) =>
    //             (character.species ?? []).some((url: string) =>
    //                 selectedUrls.includes(url)
    //             )
    //         );
    //     }
    //     console.log(this.alldata);
    //     this.currentPage = 1;
    //     this.updatePage();
    // }
    // filterByfilms() {
    //     console.log("it is triggered")
    //     const selectedFilms = this.selectedFilters['films'] ?? [];

    //     if (selectedFilms.length === 0) {
    //         this.presentalldata = [...this.alldata];
    //     } else {
    //         const selectedUrls = this.dropdownmovies
    //             .filter((film: any) => selectedFilms.includes(film.title))
    //             .map((film: any) => film.url);

    //         this.presentalldata = this.alldata.filter((character: any) =>
    //             (character.films ?? []).some((url: string) =>
    //                 selectedUrls.includes(url)
    //             )
    //         );
    //     }

    //     this.currentPage = 1;
    //     this.updatePage();

    //     console.log(this.presentalldata);

    // };


    // filterBystarships() {
    //     console.log("it is triggered")
    //     const selectedStarships = this.selectedFilters['starships'] ?? [];

    //     if (selectedStarships.length === 0) {
    //         this.presentalldata = [...this.alldata];
    //     } else {
    //         const selectedUrls = this.dropdownstartship
    //             .filter((vehicles: any) => selectedStarships.includes(vehicles.name))
    //             .map((vehicles: any) => vehicles.url);

    //         this.presentalldata = this.alldata.filter((character: any) =>
    //             (character.starships ?? []).some((url: string) =>
    //                 selectedUrls.includes(url)
    //             )
    //         );
    //     }
    //     console.log(this.alldata);
    //     this.currentPage = 1;
    //     this.updatePage();
    // }

    applyFilters() {
        const selectedSpecies = this.selectedFilters['species'] ?? [];
        const selectedFilms = this.selectedFilters['films'] ?? [];
        const selectedVehicles = this.selectedFilters['vehicles'] ?? [];
        const selectedStarships = this.selectedFilters['starships'] ?? [];
        const selectedBirthRanges = this.selectedFilters['bday'] ?? [];

        const speciesUrls = (this.dropdownspecies ?? [])
            .filter((item: any) => selectedSpecies.includes(item.name))
            .map((item: any) => item.url);


        const filmUrls = (this.dropdownmovies ?? [])
            .filter((item: any) => selectedFilms.includes(item.title))
            .map((item: any) => item.url);


        const vehicleUrls = (this.dropdownvehicle ?? [])
            .filter((item: any) => selectedVehicles.includes(item.name))
            .map((item: any) => item.url);


        const starshipUrls = (this.dropdownstartship ?? [])
            .filter((item: any) => selectedStarships.includes(item.name))
            .map((item: any) => item.url);

        this.presentalldata = this.alldata.filter((character: any) => {
            const birthYear = this.getBirthYearValue(character.birth_year);

            const matchesSpecies =
                selectedSpecies.length === 0 ||
                (character.species ?? []).some((url: string) =>
                    speciesUrls.includes(url)
                );

            const matchesFilms =
                selectedFilms.length === 0 ||
                (character.films ?? []).some((url: string) =>
                    filmUrls.includes(url)
                );

            const matchesVehicles =
                selectedVehicles.length === 0 ||
                (character.vehicles ?? []).some((url: string) =>
                    vehicleUrls.includes(url)
                );

            const matchesStarships =
                selectedStarships.length === 0 ||
                (character.starships ?? []).some((url: string) =>
                    starshipUrls.includes(url)
                );
            const matchesBirthYear =
                selectedBirthRanges.length === 0 ||
                (
                    birthYear !== null &&
                    selectedBirthRanges.some(range => {
                        switch (range) {
                            case 'Before 30 BBY':
                                return birthYear < -30;

                            case '30 BBY to 5 ABY':
                                return birthYear >= -30 && birthYear <= 5;

                            case 'After 5 ABY':
                                return birthYear > 5;

                            default:
                                return false;
                        }
                    })
                );
            return (
                matchesSpecies &&
                matchesFilms &&
                matchesVehicles &&
                matchesStarships && matchesBirthYear
            );
        });

        // Update pagination after filtering
        this.totalPages = Math.ceil(
            this.presentalldata.length / this.pageSize
        );

        this.currentPage = 1;
        this.updatePage();

        console.log('Filtered characters:', this.presentalldata);
    }


    birthYearOptions: string[] = ['Before 30 BBY',
        '30 BBY to 5 ABY',
        'After 5 ABY'];
    getBirthYearValue(birthYear: string): number | null {
        const match = birthYear?.match(
            /^(\d+(?:\.\d+)?)(BBY|ABY)$/i
        );

        if (!match) {
            return null;
        }

        const year = Number(match[1]);
        const era = match[2].toUpperCase();

        return era === 'BBY' ? -year : year;
    }
    selectedFilters: { [key: string]: string[] } = {
        films: [],
        starships: [],
        vehicles: [],
        species: [],
        bday: []
    };

    selectAllStatus: { [key: string]: boolean } = {
        films: false,
        starships: false,
        vehicles: false,
        species: false,
        bday: false
    };

    toggleSelectAll(filterName: string, items: string[], checked: boolean) {
        this.selectAllStatus[filterName] = checked;
        this.selectedFilters[filterName] = checked ? [...items] : [];
        console.log(this.selectAllStatus)
        console.log(this.selectedFilters)
        //here we can apply on real time filter by uncommenting this function when we select any item from dropdown
        this.applyFilters();
    }
    toggleItem(filterName: string, item: string, checked: boolean, items: string[]) {
        const selected = this.selectedFilters[filterName] ?? [];
        console.log(selected);
        if (checked) {
            if (!selected.includes(item)) {
                this.selectedFilters[filterName] = [...selected, item];
            }
        } else {
            this.selectedFilters[filterName] = selected.filter(x => x !== item);
        }

        this.selectAllStatus[filterName] =
            items.length > 0 &&
            this.selectedFilters[filterName].length === items.length;
        console.log(this.selectedFilters);
        console.log(this.selectAllStatus);

        this.applyFilters()
        //here we can apply on real time filter by uncommenting this function when we select any item from dropdown
        // this.filterBySpecies();
        // this.filterByVehicle();
        // this.filterByfilms();
        // this.filterBystarships();
    }
    dropdownvaluesspecies: any[] = [];
    dropdownvaluespecies() {
        this.myservice.allspeciesnamedropdown().subscribe({
            next: data => {
                this.dropdownspecies = data.results;
                this.dropdownvaluesspecies = this.dropdownspecies.map(
                    (character: any) => character.name
                );

            }, error: (err) => {
                console.log(err);
            }
        })
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages) {
            return;
        }

        this.currentPage = page;
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePage();
        }
    }
    getId(url: string): string {
        return url.split('/').filter(Boolean).pop()!;
    }
}
