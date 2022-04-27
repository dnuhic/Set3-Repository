import 'dart:core';

class UserOrderModel {
  int Id = 0;
  String UpdatedDate = "";
  bool Done = false;
  int ShopId = 0;
  int UserId = 0;
  int CashRegisterId = 0;

  UserOrderModel(
      this.Id, this.UpdatedDate, this.Done, this.ShopId, this.UserId, this.CashRegisterId);

  int get id => Id;
  String get date => UpdatedDate;
  bool get done => Done;
  int get shopID => ShopId;
  int get userID => UserId;
  int get cashRegisterID => CashRegisterId;

  factory UserOrderModel.fromJson(dynamic json) {
    return UserOrderModel(json['id'] as int, json['updatedDate'] as String,
        json['done'] as bool, json['shopId'] as int, json['userId'] as int, json['cashRegisterId']);
  }
  Map<String, dynamic> toMap() {
    var map = Map<String, dynamic>();
    map["id"] = Id;
    map["date"] = UpdatedDate;
    map["done"] = Done;
    map["shopID"] = ShopId;
    map["userID"] = UserId;
    map['cashRegisterID'] = CashRegisterId;
    return map;
  }

  UserOrderModel.fromObject(dynamic o) {
    this.Id = o["Id"];
    this.UpdatedDate = o["UpdatedDate"];
    this.Done = o["Done"];
    this.ShopId = o["ShopId"];
    this.UserId = o["UserId"];
    this.CashRegisterId = o["CashRegisterId"];
  }
}
