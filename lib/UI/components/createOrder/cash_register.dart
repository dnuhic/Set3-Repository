class CashRegister {
  int id;
  String name;
  CashRegister(this.id, this.name);

  factory CashRegister.fromJson(dynamic json) {
    return CashRegister(json['id'], json['name']);
  }
}