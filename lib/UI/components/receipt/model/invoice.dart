import 'dart:core';

class BillModel {
  final BillInfo info;
  final List<BillItem> items;
  final BillSupplier supplier;

  const BillModel({this.info, this.items, this.supplier});

  factory BillModel.fromJson(dynamic json) {
    final billInfo = BillInfo.fromJson(json["billInfo"]);
    final billSupplier = BillSupplier.fromJson(json["billSupplier"]);
    var tagObjsJson = json["billItems"] as List;
    List<BillItem> tagObjs =
        tagObjsJson.map((tagJson) => BillItem.fromJson(tagJson)).toList();

    return BillModel(info: billInfo, items: tagObjs, supplier: billSupplier);
  }
}

class BillInfo {
  final String number;
  final String date;
  final String storeName;
  final String adress;
  final String cashRegister;

  const BillInfo(
      {this.number, this.date, this.cashRegister, this.adress, this.storeName});

  factory BillInfo.fromJson(dynamic json) {
    return BillInfo(
        number: json["number"],
        date: json["date"],
        storeName: json["storeName"],
        adress: json["storeAdress"],
        cashRegister: json["cashRegister"]);
  }
}

class BillItem {
  final String name;
  final double quantity;
  final String mesuarment;
  final double vat;
  final double unitPrice;

  const BillItem({
    this.name,
    this.quantity,
    this.mesuarment,
    this.vat,
    this.unitPrice,
  });
  factory BillItem.fromJson(dynamic json) {
    return BillItem(
        name: json["name"],
        quantity: json["quantity"].toDouble(),
        mesuarment: json["measurment"],
        vat: json["vat"],
        unitPrice: json["unitPrice"].toDouble());
  }

  Map<String, dynamic> toMap() {
    var map = Map<String, dynamic>();
    map["name"] = name;
    map["quantity"] = quantity;
    map["measurment"] = mesuarment;
    map["vat"] = vat;
    map["unitPrice"] = unitPrice;
    return map;
  }
}

class BillSupplier {
  final String firstName;
  final String lastName;
  final String email;

  const BillSupplier({this.firstName, this.lastName, this.email});

  factory BillSupplier.fromJson(dynamic json) {
    return BillSupplier(
        firstName: json["firstName"],
        lastName: json["lastName"],
        email: json["email"]);
  }
}
