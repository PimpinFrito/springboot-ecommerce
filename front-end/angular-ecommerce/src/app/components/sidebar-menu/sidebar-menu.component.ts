import { Component, Inject, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

toConsole() {
  console.log("Keys up");
}

   categories : ProductCategory[] = [];
   url : string = ""


  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  
  }

  getCategories(): void {
    this.productService.getCategoryList().subscribe( 
      data => {this.categories = data;
      console.log(this.categories);
    }
    );
    
    console.log(this.categories);
  }

}
