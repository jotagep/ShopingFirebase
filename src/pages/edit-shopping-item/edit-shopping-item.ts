import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';

import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";
/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {

    const itemId: string = this.navParams.get('itemId');

    this.shoppingItemRef$ = this.database.object(`shopping-list/${itemId}`);
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(
      item => this.shoppingItem = item
    );
  }

  editShoppingItem() {
    this.shoppingItemRef$.update(this.shoppingItem);
    this.navCtrl.pop();
  }

  ionicViewWillLeave () {
    this.shoppingItemSubscription.unsubscribe();
  }

}
