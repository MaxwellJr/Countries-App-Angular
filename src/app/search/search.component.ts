import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { Country } from '../country';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private service: SharedService) {
    this.inputCountry = "";
    this.country = { name: "", cca2: "", capital: "", region: "", population: 0, area: 0 };
    this.isAdded = false;
  }

  public inputCountry: string;
  public country: Country;
  public isAdded: boolean;
  private searchSubscribtion: Subscription;
  private addToDbSubscribtion: Subscription;

  ngOnInit(): void {
  }

  searchButtonClick(): void {
    if (this.inputCountry !== "") {
      this.isAdded = false;
      this.searchSubscribtion = this.service.searchCountry(this.inputCountry).subscribe((data: any[]) => {
        this.country.name = data[0].name.official;
        this.country.cca2 = data[0].cca2;
        this.country.capital = data[0].capital[0];
        this.country.region = data[0].region;
        this.country.population = data[0].population;
        this.country.area = data[0].area;
      });
    }
  }

  addButtonClick(): void {
    if (this.country.name !== null) {
      this.addToDbSubscribtion = this.service.addCountry(this.country).subscribe(response => console.log(response));
      this.isAdded = true;
    }
  }

  clearButtonClick(): void {
    this.isAdded = false;
    this.inputCountry = "";
    this.country.name = "";
    this.country.cca2 = "";
    this.country.capital = "";
    this.country.region = "";
    this.country.population = 0;
    this.country.area = 0;
  }

  ngOnDestroy(): void {
    if (this.searchSubscribtion) {
      this.searchSubscribtion.unsubscribe();
    }
    if (this.addToDbSubscribtion) {
      this.addToDbSubscribtion.unsubscribe();
    }
  }
}
