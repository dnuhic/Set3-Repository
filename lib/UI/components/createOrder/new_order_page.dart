
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:tasklist/UI/components/createOrder/product.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/main.dart';

import '../orders/api.services.dart';


class NewOrderPage extends StatefulWidget {
  @override
  State<NewOrderPage> createState() => _NewOrderPageState();
}

class _NewOrderPageState extends State<NewOrderPage> {
  List<Product> items = [];

  List<Shop> shops = [];

  Shop selectedShop;

  _getShops() {
    APIServices.fetchStores().then((response) {
      print(response.body);
      setState(() {
        Iterable list = json.decode(response.body);
        shops = list.map((model) => Shop.fromJson(model)).toList();
        selectedShop = shops[0];
        APIServices.fetchProducts(selectedShop.id).then((response) {
          print(response.body);
          setState(() {
            Iterable list = json.decode(response.body);
            items = list.map((model) => Product.fromJson(model)).toList();
          });
        });
      });
    });
  }

  @override
  void initState() {
    super.initState();

    _getShops();
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      body: LayoutBuilder(builder: (context, constraints) {
        if (shops.isNotEmpty) {
          return Column(
            children: <Widget>[
              Icon(
                Icons.store,
                color: Colors.black,
                size: 40.0,
              ),
              Center(
                child: SizedBox(
                  width: 130,
                  child: DropdownButtonFormField<Shop>(
                    decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(width: 3, color: Colors.blue),
                      ),
                    ),
                    value: selectedShop,
                    items: shops
                        .map((shop) => DropdownMenuItem<Shop>(
                      value: shop,
                      child: Text(shop.name, style: TextStyle(fontSize: 14)),
                    ))
                        .toList(),
                    onChanged: (shop) => {
                      APIServices.fetchProducts(shop.id).then((response) {
                        print(response.body);

                        setState(() {
                          Iterable list = json.decode(response.body);
                          items = list.map((model) => Product.fromJson(model)).toList();

                        });
                      }),
                      setState(() => {
                        selectedShop = shop
                      }),
                    },

                  ),
                ),
              ),
              SizedBox(height: 5),
              Visibility(
                  child:
                  Text(selectedShop.name)
              ),
              SizedBox(height: 5),
              Visibility(
                visible: items.isNotEmpty,
                child:
                Expanded(
                  child: ListView.separated(
                      itemBuilder: (context, index) {
                        return Card(
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15.0)),
                          child: ListTile(
                            title: Text(items[index].Name),
                            leading: Icon(Icons.shopping_bag_outlined),
                            subtitle: Text(
                              items[index].Price.toString() + " BAM",
                              style: const TextStyle(fontSize: 11),
                            ),
                            dense: false,
                            onTap: () {
                              openProductDialog(items[index].Name);
                            },
                            trailing: buildTrailingWidget(index),
                          ),
                        );
                      },
                      separatorBuilder: (context, index) {
                        return Divider(
                          height: 1,
                        );
                      },
                      itemCount: items.length),
                ),
              ),
              Visibility(
                child:
                Container(
                  color: Color(0xfff3c526e),
                  child: Column(
                    children: [
                      SizedBox(
                        height: 6,
                      ),

                      Container(
                        alignment: Alignment.centerRight,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            "Total : " + calculateTotal() + " BAM",
                            style: const TextStyle(
                                fontSize: 20,
                                color: Colors.white,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),

                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          TextButton(
                            style: TextButton.styleFrom(
                              primary: Colors.white,
                            ),
                            onPressed: () {
                              // const snackBar = SnackBar(
                              //   content: Text(
                              //       "Order saved, napraviti return to previous page"),
                              //   duration: Duration(seconds: 2),
                              // );
                              // ScaffoldMessenger.of(context)
                              //     .showSnackBar(snackBar);
                              //TODO("treba napraviti za usera, i za cash register, da se salje kako treba")
                              List<ProductQuantitys> productQuantitys = [];

                              for(Product product in items) {
                                if(product.chosenQuantity != 0)
                                  productQuantitys.add(ProductQuantitys(product.productId, product.chosenQuantity));
                              }
                              if(items.isNotEmpty) {
                                SavedOrderBody body = SavedOrderBody(MyApp.userId, selectedShop.id, 1, productQuantitys);
                                APIServices.sendOrder(body, "save").then((value) => print("gotovo"));
                              }
                            },
                            child: Text(
                              "Save",
                              style: const TextStyle(fontSize: 20),
                            ),
                          ),
                          TextButton(
                            style: TextButton.styleFrom(
                              primary: Colors.white,
                            ),
                            onPressed: () {
                              // const snackBar = SnackBar(
                              //   content: Text(
                              //       "Order done, napraviti prikaz fiskalnog racuna"),
                              //   duration: Duration(seconds: 2),
                              // );
                              // ScaffoldMessenger.of(context)
                              //     .showSnackBar(snackBar);
                              //TODO("treba napraviti za usera, i za cash register, da se salje kako treba")
                              List<ProductQuantitys> productQuantitys = [];

                              for(Product product in items) {
                                if(product.chosenQuantity != 0)
                                  productQuantitys.add(ProductQuantitys(product.productId, product.chosenQuantity));
                              }
                              if(items.isNotEmpty) {
                                SavedOrderBody body = SavedOrderBody(MyApp.userId, selectedShop.id, 1, productQuantitys);
                                APIServices.sendOrder(body, "finish").then((value) => print("gotovo"));
                              }
                            },
                            child: Text(
                              "Order",
                              style: const TextStyle(fontSize: 20),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        } else {
          return Container(
            child: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }
      }),
    );
  }

  Future openProductDialog(String name) => showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Product info"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text("Description of product..." + name),
          Text("Price of product..."),
          Text("Category of product..."),
          Text("Barcode image : "),
          Text("Barcode number : "),
          TextButton(
            child: Text("Close"),
            onPressed: () {
              Navigator.of(context).pop();
            },
          )
        ],
      ),
    ),
  );

  Widget buildTrailingWidget(int index) {
    return FittedBox(
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        IconButton(
            onPressed: () {
              setState(() {
                if (items[index].chosenQuantity <
                    items[index].quantity)
                  items[index].chosenQuantity++;
              });
            },
            icon: Icon(Icons.add_circle)),
        Container(
            width: 30,
            alignment: Alignment.center,
            child: Text(items[index].chosenQuantity.toString())),
        IconButton(
            onPressed: () {
              setState(() {
                if (items[index].chosenQuantity != 0)
                  items[index].chosenQuantity--;
              });
            },
            icon: Icon(Icons.remove_circle)),
      ]),
    );
  }

  String calculateTotal() {
    double sum = 0;
    items.forEach((element) {
      sum += element.chosenQuantity * element.Price;
    });
    return sum.toString();
  }
}
