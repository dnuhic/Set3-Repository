class ProductQuantitys {
  int productId;
  double quantity;

  ProductQuantitys(this.productId, this.quantity);

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
  int tableId;
  List<ProductQuantitys> productQuantitys;

  SavedOrderBody(this.userId, this.shopId, this.cashRegisterId, this.tableId, this.productQuantitys);

  Map toJson() => {
    'userId' : userId,
    'shopId' : shopId,
    'cashRegisterId' : cashRegisterId,
    'tableId' : tableId,
    'productQuantitys' : productQuantitys
  };
}