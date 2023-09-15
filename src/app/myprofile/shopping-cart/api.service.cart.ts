import { HttpClient } from '@angular/common/http';
import { MyProfileService } from '../profileapiservice';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  token = localStorage.getItem('token');
  username: string | null = null; // Initialize username as null

  constructor(private http: HttpClient, private profile: MyProfileService) {}

  fetchCartItems(): Observable<any[]> {
    if (this.token) {
      const user = this.profile.decodeJwt(this.token);
      console.log(user);
      this.username = user.username;
    }

    return this.http.post<any[]>('http://localhost:3360/cart/getcart', {
      username: this.username,
    });
  }

  refreshCartItems() {
    this.fetchCartItems();
  }
  incrementCartItem(productId : number ) {
    const data = {
      username : this.username,
      productId : productId
    }
return this.http.post<any>('http://localhost:3360/cart/create', data)
  }
  deleteProduct(productId: number) {
    console.log('api');
    const data = {
      username: this.username,
      productId: productId,
    };
    return this.http.post<any>('http://localhost:3360/cart/delete', data);
  }
}
