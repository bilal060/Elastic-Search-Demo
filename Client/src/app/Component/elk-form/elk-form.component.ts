import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { SpellCheckerService } from 'ngx-spellchecker';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-elk-form',
  templateUrl: './elk-form.component.html',
  styleUrls: ['./elk-form.component.scss'],
  providers: [SpellCheckerService],
})
export class ElkFormComponent implements OnInit {
  exform: FormGroup;
  categories: any;
  searchResult: any;
  dictionary: any;
  suggestions: any;
  showSuggestions: any;
  previousValue: any;
  fileURL =
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
  constructor(
    private search: SearchService,
    private spellCheckerService: SpellCheckerService,
    private httpClient: HttpClient
  ) {
    this.showSuggestions = false;
    this.exform = new FormGroup({
      Category: new FormControl(''),
      Query: new FormControl(),
    });
    this.httpClient
      .get(this.fileURL, { responseType: 'text' })
      .subscribe((res: any) => {
        this.dictionary = this.spellCheckerService.getDictionary(res);
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
  searchBykey(event: any) {
    this.previousValue = this.exform.value.Query.split(' ')
      .splice(0, this.exform.value.Query.split(' ').length - 1)
      .join(' ');
    this.suggestions = this.dictionary.getSuggestions(
      event.target.value.split(' ').pop()
    );
    this.showSuggestions = true;
  }

  suggestHandler(value: any) {
    this.suggestions = undefined;
    this.showSuggestions = false;
    console.clear();
    if (value && value.length > 0) {
      this.exform.setValue({
        ...this.exform.value,
        Query: this.previousValue + ' ' + value,
      });
    }
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

  ngOnInit() {}
}
