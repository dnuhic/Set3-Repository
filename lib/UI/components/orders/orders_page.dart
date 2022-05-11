import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:tasklist/UI/components/editOrder/edit_order_page.dart';

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
    APIServices.fetchDoneUserOrders(MyApp.getCashRegisterId()).then((response) {
      setState(() {
        Iterable list = json.decode(response.body);
        orders = list.map((model) => UserOrderModel.fromJson(model)).toList();
        orders.sort((a,b) {
          return DateTime.parse(b.UpdatedDate).compareTo(DateTime.parse(a.UpdatedDate));
        });
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
      body: Stack(
        children: [
          Background(),
          LayoutBuilder(builder: (context, constraints) {
              return Column(
                children: <Widget>[
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 5, top: 10, right: 10, left: 10),
                      child: Text("Order History:", style: TextStyle(fontSize: 18, color: Colors.white)),
                    ),
                  ),
                  // const Card(
                  //   color: Colors.white70,
                  //   child: Padding(
                  //     padding: EdgeInsets.all(16.0),
                  //     child: Text("My orders", style: TextStyle(fontSize: 17)),
                  //   ),
                  // ),
                  Expanded(
                    child: ListView.separated(
                        itemBuilder: (context, index) {
                          return Card(
                            shape: RoundedRectangleBorder(
                                side: BorderSide(color: Colors.grey),
                                borderRadius: BorderRadius.circular(15.0)),
                            child: ListTile(
                              title: Text("Order ID: #" + orders[index].Id.toString(), style: TextStyle(fontSize: 14)),
                              leading: Icon(Icons.shopping_cart),
                              subtitle: Text(DateTime.parse(orders[index].UpdatedDate).day.toString()
                                  + "/" + DateTime.parse(orders[index].UpdatedDate).month.toString() + "/"
                                  + DateTime.parse(orders[index].UpdatedDate).year.toString() + " "
                                  + DateTime.parse(orders[index].UpdatedDate).hour.toString() + ":"
                                  + DateTime.parse(orders[index].UpdatedDate).minute.toString()),
                              dense: true,
                              //show if order is done
                              trailing: orderDone(orders[index]),
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
          }),
        ],
      ),
    );
  }

  //Add code to display receipt on click
  Widget orderDone(UserOrderModel order) {
    if (order.Done == true) {
      return FittedBox(
        child: Row(children: [
          IconButton(
              onPressed: () async {
                print("TU sam");
                final data = await fetchData(order);
                
                print(data.toString());
                var jir = generateRandomString();
                if(await hrvFiskalizacija(order.shopID)){
                  jir = generateRandomNumber();
                }
                final pdfFile = await PdfInvoiceApi.generate(data,jir);

                PdfApi.openFile(pdfFile);
              },
              icon: Icon(Icons.receipt_long_outlined)),
        ]),
      );
    } else {
      return FittedBox(
        child: Row(children: [
          Icon(
            Icons.pending_actions,
            color: Colors.grey,
            size: 30.0,
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

    return BillModel.fromJson(jsonDecode(response.body));
  }

  static Future hrvFiskalizacija(int shopId) async {
    final response = await http.get(
      Uri.parse(
          MyApp.getBaseUrl() + '/HratskaFiskalizacija/'+shopId),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    return response.body;
  }

  static Future fetchJir(dynamic bill) async {

    //final uri = Uri.parse('https://192.168.1.2:7194/api/ProductUserOrderIntertables/bill', queryParameters)

    final response = await http.post(
      Uri.parse(
          MyApp.getBaseUrl() + '/api/ExecuteFiscalization'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(bill),
    );

    return response.body;
  }

  String generateRandomString() {
    var r = Random();
    const _chars = '0123456789abcdef';
    var jir = List.generate(32, (index) => _chars[r.nextInt(_chars.length)]).join();
    var i = 0; 
    final dashes = {2, 3, 4, 5}; 

    final finaljir = jir.splitMapJoin(RegExp('....'), onNonMatch: (s) => dashes.contains(i++)? '-' : '');

    return finaljir;
  }

  String generateRandomNumber() {
    var r = Random();
    const _chars = '0123456789';
    var jir = List.generate(6, (index) => _chars[r.nextInt(_chars.length)]).join();
    return jir;
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