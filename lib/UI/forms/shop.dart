class Shop {
  int id;
  String name;
  Shop(this.id, this.name);

  factory Shop.fromJson(dynamic json) {
    return Shop(json['id'], json['name']);
  }
}
