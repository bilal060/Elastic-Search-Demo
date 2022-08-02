import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElkFormComponent } from './Component/elk-form/elk-form.component';
const routes: Routes = [
  {
    path: '',
    component: ElkFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
