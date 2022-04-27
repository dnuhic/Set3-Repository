import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';

import 'dart:convert';

import 'package:tasklist/UI/components/orders/api.services.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/userordermodel.dart';
import 'package:tasklist/main.dart';

import '../../background/background.dart';
import '../receipt/api/pdf_api.dart';
import '../receipt/api/pdf_invoice_api.dart';
import '../receipt/model/invoice.dart';


class OrderPage extends StatefulWidget {
  @override
  State<OrderPage> createState() => _OrderPageState();
}

class _OrderPageState extends State<OrderPage> {
  var orders = <UserOrderModel>[];

  // This widget is the root of your application.
  _getOrders() {
    APIServices.fetchUserOrder().then((response) {
      setState(() {
        Iterable list = json.decode(response.body);
        orders = list.map((model) => UserOrderModel.fromJson(model)).toList();
      });
    });
  }

  @override
  void initState() {
    super.initState();

    _getOrders();
  }

  //Data from UserOrderModel, filter based on userId!
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LayoutBuilder(builder: (context, constraints) {
        if (orders.isNotEmpty) {
          return Column(
            children: <Widget>[
              const Card(
                color: Colors.white70,
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text("My orders", style: TextStyle(fontSize: 17)),
                ),
              ),
              Expanded(
                child: ListView.separated(
                    itemBuilder: (context, index) {
                      return Card(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15.0)),
                        child: ListTile(
                          title: Text("Order " + orders[index].Id.toString()),
                          leading: Icon(Icons.shopping_cart),
                          subtitle: Text(orders[index]
                              .UpdatedDate
                              .toString()
                              .substring(0, 10)),
                          dense: true,
                          //show if order is done
                          trailing:
                          orderDone(orders[index]),
                        ),
                      );
                    },
                    separatorBuilder: (context, index) {
                      return Divider(
                        height: 1,
                      );
                    },
                    itemCount: orders.length),
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

  //Add code to display receipt on click
  Widget orderDone(UserOrderModel order) {
    if (order.Done == true) {
      return FittedBox(
        child: Row(children: [
          Icon(
            Icons.done,
            color: Colors.green,
            size: 40.0,
          ),
          IconButton(
              onPressed: () async {
                print("TU sam");
                final data = await fetchData(order);
                print(data.toString());
                final pdfFile = await PdfInvoiceApi.generate(data);

                PdfApi.openFile(pdfFile);
              },
              icon: Icon(Icons.receipt)),
        ]),
      );
    } else {
      return FittedBox(
        child: Row(children: [
          Icon(
            Icons.pending,
            color: Colors.grey,
            size: 40.0,
          ),
        ]),
      );
    }
  }
  static Future fetchData(UserOrderModel order) async {

    //final uri = Uri.parse('https://192.168.1.2:7194/api/ProductUserOrderIntertables/bill', queryParameters)

    final response = await http.post(
      Uri.parse(
          MyApp.getBaseUrl() + '/api/ProductUserOrderIntertables/bill'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, int>{
        "UserOrderId": order.Id,
        "CurrentUserId": order.UserId,
        "CashRegisterId": order.CashRegisterId,
        "ShopId": order.shopID
      }),
    );

    response.body;

    return BillModel.fromJson(jsonDecode(response.body));
  }

  Future receiptDialog(int orderId) => showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Receipt"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text("Order ID: " + orderId.toString()),
          Text("Products..."),
          Text("Price..."),
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
}