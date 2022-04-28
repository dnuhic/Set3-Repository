
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tasklist/UI/components/createOrder/cash_register.dart';
import 'package:tasklist/UI/components/createOrder/product.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/UI/components/orders/userordermodel.dart';
import 'package:tasklist/main.dart';

import '../orders/api.services.dart';


class EditOrderPage extends StatefulWidget {
  UserOrderModel userOrderModel;

  EditOrderPage(this.userOrderModel);

  @override
  State<EditOrderPage> createState() => _EditOrderPageState(userOrderModel);
}

class _EditOrderPageState extends State<EditOrderPage> {

  UserOrderModel userOrderModel;
  _EditOrderPageState(this.userOrderModel);

  final _inputController = TextEditingController();

  List<ProductForEdit> items = [];

  List<CashRegister> cashRegisters = [];

  CashRegister selectedCashRegister;

  _getShops() {
    print("OVDJE SAM");
    APIServices.fetchProductsFromUserOrder(userOrderModel.id).then((value) {
      setState(() {
          APIServices.fetchCashRegistersFromShop(userOrderModel.shopID).then((response) {
            setState(() {
              Iterable list = json.decode(response.body);
              print("Lista kasa:" + list.toString());
              cashRegisters = list.map((model) => CashRegister.fromJson(model)).toList();
              selectedCashRegister = cashRegisters[0];
              APIServices.fetchProductsFromUserOrder(userOrderModel.id).then((response) {
                setState(() {
                  Iterable list = json.decode(response.body);
                  items = list.map((model) => ProductForEdit.fromJson(model)).toList();
                });
              });
            });
        });
      });
    });
    // APIServices.fetchStores().then((response) {
    //   setState(() {
    //     Iterable list = json.decode(response.body);
    //     shops = list.map((model) => Shop.fromJson(model)).toList();
    //     selectedShop = shops[0];
    //     APIServices.fetchCashRegistersFromShop(selectedShop.id).then((response) {
    //       setState(() {
    //         Iterable list = json.decode(response.body);
    //         print("Lista kasa:" + list.toString());
    //         cashRegisters = list.map((model) => CashRegister.fromJson(model)).toList();
    //         selectedCashRegister = cashRegisters[0];
    //         APIServices.fetchProducts(selectedShop.id).then((response) {
    //           setState(() {
    //             Iterable list = json.decode(response.body);
    //             items = list.map((model) => Product.fromJson(model)).toList();
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
  }

  @override
  void initState() {
    super.initState();

    _getShops();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xfff3c526e),
        elevation: 0,
        title: Padding(
          padding: const EdgeInsets.only(top: 6.0),
          child: Text('SET3 Cash Counter',
              style: GoogleFonts.lato(
                  color: Colors.white,
                  fontSize: 15,
                  letterSpacing: 0.3,
                  fontWeight: FontWeight.normal)),
        ),
        centerTitle: true,
      ),
      body: LayoutBuilder(builder: (context, constraints) {
        return Column(
          children: <Widget>[
            SizedBox(height: 5),
            Padding(
              padding: const EdgeInsets.only(left: 10, right: 10, top: 10, bottom: 0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text("My cart:", style: TextStyle(fontSize: 18),),
              ),
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
                            items[index].Price.toString() + " BAM" + ' (' + items[index].measuringUnit + ')',
                            style: const TextStyle(fontSize: 11),
                          ),
                          dense: false,
                          onTap: () {
                            openProductDialog(items[index]);
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
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(color: Colors.white),
                        ),
                      ),
                    ),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        TextButton(
                          style: TextButton.styleFrom(
                            primary: Colors.white,
                          ),
                          onPressed: () {
                            APIServices.deleteOrder(userOrderModel.id).then((value) {
                              Navigator.push(context, MaterialPageRoute(builder: (context) => MyHomePage(0)));
                            });
                            // const snackBar = SnackBar(
                            //   content: Text(
                            //       "Order done, napraviti prikaz fiskalnog racuna"),
                            //   duration: Duration(seconds: 2),
                            // );
                            // ScaffoldMessenger.of(context)
                            //     .showSnackBar(snackBar);

                          },
                          child: Text(
                            "Delete",
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
                            //       "Order saved, napraviti return to previous page"),
                            //   duration: Duration(seconds: 2),
                            // );
                            // ScaffoldMessenger.of(context)
                            //     .showSnackBar(snackBar);
                            //TODO("treba napraviti za usera, i za cash register, da se salje kako treba")
                            List<ProductQuantitys> productQuantitys = [];

                            for(ProductForEdit product in items) {
                              if(product.chosenQuantity != 0)
                                productQuantitys.add(ProductQuantitys(product.productId, product.chosenQuantity));
                            }
                            if(items.isNotEmpty) {
                              SavedOrderBody body = SavedOrderBody(MyApp.userId, userOrderModel.shopID, 0, productQuantitys);
                              APIServices.sendOrderEdit(body, "save", userOrderModel.id).then((value) {
                                Navigator.push(context, MaterialPageRoute(builder: (context) => MyHomePage(0)));
                              });
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
                            openCashRegisterChooser();
                            // const snackBar = SnackBar(
                            //   content: Text(
                            //       "Order done, napraviti prikaz fiskalnog racuna"),
                            //   duration: Duration(seconds: 2),
                            // );
                            // ScaffoldMessenger.of(context)
                            //     .showSnackBar(snackBar);

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
      }),
    );
  }

  Future openCashRegisterChooser() => showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Select a cash register"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DropdownButtonFormField<CashRegister>(
            decoration: InputDecoration(
              // enabledBorder: OutlineInputBorder(
              //   borderRadius: BorderRadius.circular(12),
              //   borderSide: BorderSide(width: 0, color: Colors.blue),
              // ),
            ),
            value: selectedCashRegister,
            items: cashRegisters
                .map((cashRegister) => DropdownMenuItem<CashRegister>(
              value: cashRegister,
              child: Row(
                children: [
                  Text(cashRegister.name, style: TextStyle(fontSize: 16)),
                ],
              ),
            ))
                .toList(),
            onChanged: (cashRegister) => {
              setState(() => {
                selectedCashRegister = cashRegister
              }),
            },

          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                child: Text("Cancel"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              TextButton(
                child: Text("Confirm"),
                onPressed: () {
                  //TODO("treba napraviti za usera, i za cash register, da se salje kako treba")
                  List<ProductQuantitys> productQuantitys = [];

                  for(ProductForEdit product in items) {
                    if(product.chosenQuantity != 0)
                      productQuantitys.add(ProductQuantitys(product.productId, product.chosenQuantity));
                  }
                  if(items.isNotEmpty) {
                    SavedOrderBody body = SavedOrderBody(MyApp.userId, userOrderModel.shopID, selectedCashRegister.id, productQuantitys);
                    APIServices.sendOrderEdit(body, "finish", userOrderModel.id).then((value) {
                      Navigator.of(context).pop();
                      Navigator.push(context, MaterialPageRoute(builder: (context) => MyHomePage(0)));
                    });
                  }
                },
              ),
            ],
          ),
        ],
      ),
    ),
  );

  Future openProductDialog(ProductForEdit product) => showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Product info"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text("Name: " + product.Name),
          Text("Price: " + product.Price.toStringAsFixed(2) + " KM"),
          Text("Category: " + product.Category),
          Text("Barcode number: " + product.BarcodeText),
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

  Future openCustomQuantityInput(ProductForEdit product) => showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Enter custom quantity"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            keyboardType: TextInputType.number,
            controller: _inputController,
            decoration: InputDecoration(
                border: OutlineInputBorder()
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                child: Text("Cancel"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              TextButton(
                child: Text("Confirm"),
                onPressed: () {
                  setState(() {
                    if(double.parse(double.parse(_inputController.text).toStringAsFixed(2)) > product.quantity) {
                      // const snackBar = SnackBar(
                      //   content: Text(
                      //       "Quantity can not be larger than available."),
                      //   duration: Duration(seconds: 2),
                      // );
                      // ScaffoldMessenger.of(context)
                      //     .showSnackBar(snackBar);
                      //ne radi mi ovo, trebalo bi nekako prikazati error
                    } else {
                      product.chosenQuantity = double.parse(double.parse(_inputController.text).toStringAsFixed(2));
                      Navigator.of(context).pop();
                    }
                  });
                },
              ),
            ],
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
                if (items[index].chosenQuantity != 0)
                  items[index].chosenQuantity--;
              });
            },
            icon: Icon(Icons.remove_circle)),
        Container(
            width: 30,
            alignment: Alignment.center,
            child: Text(items[index].chosenQuantity.toString())),
        IconButton(
            onPressed: () {
              setState(() {
                if (items[index].chosenQuantity <
                    items[index].quantity)
                  items[index].chosenQuantity++;
              });
            },
            icon: Icon(Icons.add_circle)),
        IconButton(onPressed: () {
          _inputController.text = items[index].chosenQuantity.toString();
          openCustomQuantityInput(items[index]);

        }, icon: Icon(Icons.create_outlined, size: 20,))
      ]),
    );
  }

  String calculateTotal() {
    double sum = 0;
    items.forEach((element) {
      sum += element.chosenQuantity * element.Price;
    });
    return sum.toStringAsFixed(2);
  }
}
