import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-elk-form',
  templateUrl: './elk-form.component.html',
  styleUrls: ['./elk-form.component.scss'],
})
export class ElkFormComponent implements OnInit {
  exform: FormGroup;
  categories: any;
  searchResult: any;
  constructor(private search: SearchService) {
    this.exform = new FormGroup({
      Category: new FormControl(''),
      Query: new FormControl(),
    });
  }
  public placeholder: string = 'Select Category';
  SubmitForm() {
    console.clear();
    this.search
      .searchByKey('sample_catalog', this.exform.value)
      .subscribe((data: any) => {
        this.searchResult = data.hits.map((hit: any) => {
          return hit._source;
        });
      });

    this.search
      .getAllCategories('categories_data', this.exform.value.Query)
      .subscribe((data: any) => {
        this.categories = _.uniq(_.map(data?.hits, '_source.name'));
      });
  }

  getCategoriesByValue(event: any) {
    if (event.target.value.length > 3 || event.target.value.length === 3) {
      this.search
        .getAllCategories('categories_data', event.target.value)
        .subscribe((data: any) => {
          this.categories = data?.hits?.map((hits: any) => {
            return hits._source?.name;
          });
        });
    }
  }

  ngOnInit(): void {}
}
