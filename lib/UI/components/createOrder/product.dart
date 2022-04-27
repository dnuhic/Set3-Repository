class Product {
  Product(
      this.productId,
      this.Name,
      this.Category,
      this.quantity,
      this.Barcode,
      this.BarcodeText,
      this.Price,
      this.measuringUnit,
      this.chosenQuantity);

  final int productId;
  final String Name;
  final String Category;
  final double quantity;
  final String Barcode;
  final String BarcodeText;
  final double Price;
  final String measuringUnit;
  double chosenQuantity;

  factory Product.fromJson(dynamic json) {
    return Product(json['productId'], json['name'], json['categoryName'], json['quantity'].toDouble(), json['barcode'], json['barcodeText'], json['price'].toDouble(), json['measuringUnit'], 0);
  }
}