class ProductQuantitys {
  int productId;
  double quantity;

  ProductQuantitys(this.productId, this.quantity);

  // ProductQuantitys.fromObject(dynamic o) {
  //   this.productId = o["productId"];
  //   this.quantity = o["quantity"];
  // }
  Map toJson() =>
      {
        'productId': productId,
        'quantity': quantity,
      };
}

class SavedOrderBody {
  int userId;
  int shopId;
  int cashRegisterId;
  List<ProductQuantitys> productQuantitys;

  SavedOrderBody(this.userId, this.shopId, this.cashRegisterId, this.productQuantitys);

  Map toJson() => {
    'userId' : userId,
    'shopId' : shopId,
    'cashRegisterId' : cashRegisterId,
    'productQuantitys' : productQuantitys
  };
  // SavedOrderBody.fromObject(dynamic o) {
  //   this.userId = o["userId"];
  //   this.shopId = o["shopId"];
  //   this.cashRegisterId = o["cashRegisterId"];
  //   this.productQuantitys = o["productQuantitys"];
  // }
}