import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters/characters.component';
import { FilteredcharacterComponent } from './filteredcharacter/filteredcharacter/filteredcharacter.component';
export const routes: Routes = [
    {path:'characters',component:CharactersComponent},
    // {path:'profilepage',component:FilteredcharacterComponent}
    {path: 'characters/:id',component: FilteredcharacterComponent},
    {path: '',redirectTo: 'characters',pathMatch: 'full' }
];
