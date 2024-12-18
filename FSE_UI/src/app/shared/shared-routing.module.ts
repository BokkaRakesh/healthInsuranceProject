import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreDataComponent } from '../components/features/data-explorer/explore-data/explore-data.component';


const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {
}
