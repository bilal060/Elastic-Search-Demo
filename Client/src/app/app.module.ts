import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElkFormComponent } from './Component/elk-form/elk-form.component';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
@NgModule({
  declarations: [AppComponent, ElkFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MultiSelectModule ,
    HttpClientModule,
    AppRoutingModule,ChipListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
