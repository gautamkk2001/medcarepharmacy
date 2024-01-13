import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductdataService } from '../productdata.service';
import { GalleryDirective } from '../gallery.directive';


@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.component.html',
  styleUrls: ['./productdescription.component.css']
})
 export class ProductdescriptionComponent implements OnInit {
prodescription:any;
searchdescription:any="";
finaldescription:any="";
detailsofproduct:any="";
offer:boolean;

reviews:any;

remainingHours:any;
remainingMinutes:any;
seconds:any;

constructor(private data:ProductdataService, private route:ActivatedRoute) {
  this.data.getproducts().subscribe(data=> {this.prodescription =data
    this.route.params.subscribe(paramdata=>
      {
        this.searchdescription=paramdata['pro'];
        // ----> to find the product that clicked
        for(let pro of this.prodescription){
          if(pro.description==this.searchdescription){
            this.finaldescription=pro;
            this.detailsofproduct=pro;
            break;
          }
        }
      })
    });
    this.offer=this.data.offer;

    const now = new Date();
   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);
   const timeRemaining = endOfDay.getTime() - now.getTime();
   this.remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
   this.remainingMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
   console.log(`Remaining hours: ${this.remainingHours}, Remaining minutes: ${this.remainingMinutes}`);

}

x= setInterval( () =>{
  const now = new Date();
   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);
   const timeRemaining = endOfDay.getTime() - now.getTime();
   this.remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
   this.remainingMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  this.seconds = Math.floor((timeRemaining % (1000*60)) / 1000);
   console.log(`Remaining hours: ${this.remainingHours}, Remaining minutes: ${this.remainingMinutes}`);
},1000)


 logInUser:any="";
  ngOnInit() {
    const sessionUser = sessionStorage.getItem('userName'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.logInUser = JSON.parse(sessionUser);
    }

    this.data.searchingProductReview(this.finaldescription).subscribe((value)=>{
      this.reviews=value;
    });

  }

cartdata:any=this.finaldescription;

// ---->


  //----->  Adding to Cart
  addedCart(value:any){
    var originalId = value.id;
    var title = value.title
    var description = value.description
    var Quantity = value.Quantity
    var rating =  value.rating
    var originalAmount = value.originalAmount
    var cartQuantity = value.cartQuantity
    var stock = value.stock
    var subtotal = value.originalAmount
    var email = this.logInUser.email
    var username = this.logInUser.username
    var status = "false"


  var cartValues = new FormData();
  cartValues.append("originalId",originalId);
  cartValues.append("title",title);
  cartValues.append("description",description);
  cartValues.append("Quantity",Quantity);
  cartValues.append("rating",rating);
  cartValues.append("originalAmount",originalAmount);
  cartValues.append("cartQuantity",cartQuantity);
  cartValues.append("stock",stock);
  cartValues.append("subtotal",subtotal);
  cartValues.append("email",email);
  cartValues.append("username",username);
  cartValues.append("status",status);

    var body={
    "originalId":value.id,
    "title":value.title,
    "description": value.description,
    "Quantity": value.Quantity,
    "rating": value.rating,
    "originalAmount": value.originalAmount,
    "cartQuantity": value.cartQuantity,
    "stock": value.stock,
    "subtotal":value.originalAmount,
    "email":this.logInUser.email,
    "username":this.logInUser.username,
    "status":"false"
    }
    this.data.addToCart(cartValues).subscribe(data=>{
    })
  }

  //------->  Adding to Wishlist
  wishlist(wish:any){
    var body={
      "title":wish.title,
      "description": wish.description,
      "Quantity": wish.Quantity,
      "rating": wish.rating,
      "originalAmount": wish.originalAmount,
      "email":this.logInUser.email,
      "username":this.logInUser.username
      }
    this.data.addtoWishlist(body).subscribe(data=>{
    })
    alert("added");
  }

 }
