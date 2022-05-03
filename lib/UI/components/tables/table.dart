import 'dart:convert';

class ProductTableDto {
  final int id;
  final String name;
  final double quantity;
  final double price;
  final String measuringUnit;

  ProductTableDto(
      this.id, this.name, this.quantity, this.price, this.measuringUnit);

  factory ProductTableDto.fromJson(dynamic json) {
    return ProductTableDto(json['productId'], json['name'], json['quantity'].toDouble(), json['price'].toDouble(), json['measuringUnit']);
  }
}

class TableModel {
  final int id;
  final String name;
  final int shopId;
  final bool taken;
  final List<ProductTableDto> products;


  TableModel(this.id, this.name, this.shopId, this.taken, this.products);

  factory TableModel.fromJson(dynamic json) {
    List<ProductTableDto> list = [];
    if(json['taken'] == true)
      list = json['products'].map((model) => ProductTableDto.fromJson(model)).toList().cast<ProductTableDto>();
    return TableModel(json['tableId'], json['name'], json['shopId'], json['taken'], list);
  }
}