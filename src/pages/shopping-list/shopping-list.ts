import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

import { AddShoppingPage } from "../add-shopping/add-shopping";

import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";
import { EditShoppingItemPage } from "../edit-shopping-item/edit-shopping-item";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) 
  {
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  selectItem(item: ShoppingItem) {
    /* 
      Display an ActionSheet that gives the user the following options:
      
      1.- Edit the item
      2.- Delete the item
      3.- Cancel selection
    */

    this.actionSheetCtrl.create({
      title: `${item.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //Send the user to the EditShoppingItemPage and pass the key as a parameter
            this.navCtrl.push(EditShoppingItemPage, {
            itemId: item.$key
            });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            //Delete the current item
            this.shoppingListRef$.remove(item.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //Cancel the current item
          }
        }
      ]
    }).present();
  }

  toAddShopping() {
    this.navCtrl.push(AddShoppingPage);
  }

}
