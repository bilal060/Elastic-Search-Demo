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
  categories:any;
  constructor(private search: SearchService) {

    this.exform = new FormGroup({
      Category: new FormControl(''),
      Query: new FormControl(),
     
    });
    this.search.getAllCategories().subscribe((res:any)=>{
    this.categories =  res?.hits?.map((hits:any)=>{
        return hits._source?.name
       })
    })
  }
  
// defined the array of data
public data: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
// set placeholder to MultiSelect input element
public placeholder: string = 'Select Category';
  SubmitForm(){
    console.log(this.exform.value)
  }
  searchByKey(event: any) {
    console.log('event.target', event.target.value);
    this.search.searchByKey('hello', event.target.value).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
