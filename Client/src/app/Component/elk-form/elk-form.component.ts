import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
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
    this.search.getAllCategories('categories_data').subscribe((res: any) => {
      this.categories = res?.hits?.map((hits: any) => {
        return hits._source?.name;
      });
    });
  }

  // defined the array of data
  // set placeholder to MultiSelect input element
  public placeholder: string = 'Select Category';
  SubmitForm() {
    console.clear()
    this.search
      .searchByKey('sample_catalog', this.exform.value)
      .subscribe((data: any) => {
        this.searchResult = data.hits.map((hit: any) => {
          return hit._source;
        });
      });
  }
  searchByKey(event: any) {
    this.search.searchByKey('hello', event.target.value).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
