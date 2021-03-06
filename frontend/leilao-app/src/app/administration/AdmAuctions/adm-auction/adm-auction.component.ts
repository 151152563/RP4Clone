import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemProvider } from 'src/shared/itemProvider.model';
import { ItemProviderService } from 'src/app/services/itemProvider.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/shared/categories.model';
import { AuctionsService } from 'src/app/services/auction.services';
import { Items } from 'src/shared/items.model';
import { ItemsService } from 'src/app/services/item.service'

@Component({
  selector: 'app-adm-auction',
  templateUrl: './adm-auction.component.html',
  styleUrls: ['./adm-auction.component.css'],
  providers: [ ItemProviderService,AuctionsService,ItemsService ]
})

export class AdmAuctionComponent implements OnInit {

  public itemProvider: ItemProvider
  public categories : Category[]
  public items: Items

  public item: Items = new Items()

  constructor(
    private route: ActivatedRoute,
    private itemProviderService: ItemProviderService,
    private aucticonsServices: AuctionsService,
    private itemService: ItemsService
    
  ) { }

  public formItem: FormGroup = new FormGroup({
    'title': new FormControl(null),
    'description': new FormControl(null),
    'minimumBid': new FormControl(null),
    'imagePath': new FormControl(null),
    'categoryId': new FormControl(null),
    'itemProviderId': new FormControl(null),
  })

  ngOnInit(): void {
    this.aucticonsServices.getCategories()
    .then((categories : Category[])=>{
      this.categories = categories
    })
    .catch((param : any) =>{
      console.log(param)
    })
  }

  public getProvider(): void {
    this.itemProviderService.getItemProvider(this.formItem.value.itemProviderId)
      .then(( provider: ItemProvider ) =>{
        this.itemProvider = provider
        console.log(this.itemProvider)
    } )
  }

  public addItem(): void{
    // this.item.title = this.formItem.value.title
    // this.item.description = this.formItem.value.description
    // this.item.minimumBid = this.formItem.value.minimumBid
    // this.item.imagePath = this.formItem.value.imagePath
    // this.item.finishedOff = 1
    // this.item.categoryId = "1"
    // this.item.itemProviderId = this.itemProvider.id
    this.item.title = "Monalisa"
    this.item.description = "Monalisa"
    this.item.minimumBid = 1200.0
    this.item.imagePath = "jureg.jpg"
    this.item.finishedOff = 1
    this.item.categoryId = "2"
    this.item.itemProviderId = "1"
    console.log(this.item)
    this.itemService.createItem(this.item)
    .subscribe((response)=>{
      console.log(response.message);
      // "ER_NO_DEFAULT_FOR_FIELD: Field 'auctionID' doesn't have a default value"
    })
    window.alert("Item criado com sucesso")
  }

}
