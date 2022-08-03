import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private https: HttpClient) {}

  searchByKey(index: any, data: any) {
    let searchValue = {ShortDescription: data?.Query};
    let filters = { Category: ['Parts'] };
    // let _index = 'category';
    // let _type = '_doc';

    // /_index/_type?q=${searchValue}&&filters=${filters}
    return this.https.get<any>(
      `http://localhost:3333/search/${index}/_doc?searchValue=${JSON.stringify(
        searchValue
      )}&filters=${JSON.stringify(filters)}`
    );
  }
  getAllCategories(index:any) {
    return this.https.get(
      `http://localhost:3333/category/${index}/_doc`
    );
  }
}
