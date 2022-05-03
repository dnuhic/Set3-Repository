class CashRegister {
  int id;
  String name;
  bool installed;
  CashRegister(this.id, this.name, this.installed);

  factory CashRegister.fromJson(dynamic json) {
    return CashRegister(json['id'], json['name'], false);
  }
}
