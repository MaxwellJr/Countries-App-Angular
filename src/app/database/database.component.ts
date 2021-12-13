import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { Country } from '../country';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit, OnDestroy {

  constructor(private service:SharedService) { }

  private dbSubscription: Subscription;
  private removeSubscribtion: Subscription;
  public countriesList: Country[];


  ngOnInit(): void {
    this.dbSubscription = this.service.getDataTable().subscribe((data: Country[]) => {
      this.countriesList = data;
    });
  }

  deleteButtonClick(cca2: string): void {
    this.removeSubscribtion = this.service.deleteCountry(cca2).subscribe(response => console.log(response));
    let index: number = this.countriesList.findIndex((item: Country) => {
      return item.cca2 === cca2;
    });
    this.countriesList.splice(index, 1);
  }

  ngOnDestroy(): void {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
    if (this.removeSubscribtion) {
      this.removeSubscribtion.unsubscribe();
    }
  }
}
