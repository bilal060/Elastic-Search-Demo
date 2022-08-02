import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private https: HttpClient) {}

  searchByKey(index: any, key: any) {
    console.log(`Searching ${index} with key ${key}`);
    return this.https.get<any>(
      `http://localhost:3333/search/${index}/hello?q=${key}`
    );
  }
  getAllCategories(){
    return this.https.get('http://localhost:3333/category/categories_data/_doc')
  }
}
