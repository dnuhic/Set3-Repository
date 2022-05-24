import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/rendering.dart';
import 'package:tasklist/UI/components/createOrder/new_order_page.dart';
import 'package:tasklist/UI/components/editOrder/edit_order_page.dart';

import 'dart:convert';

import 'package:tasklist/UI/components/orders/api.services.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/userordermodel.dart';
import 'package:tasklist/UI/components/tables/table.dart';
import 'package:tasklist/main.dart';

import '../../background/background.dart';
import '../receipt/api/pdf_api.dart';
import '../receipt/api/pdf_invoice_api.dart';
import '../receipt/model/invoice.dart';

class TablePage extends StatefulWidget {
  APIServices apiServices;
  int registerId;
  int shopId;
  TablePage({this.apiServices, this.registerId, this.shopId});
  @override
  State<TablePage> createState() => _TablePageState();
}

class _TablePageState extends State<TablePage> {
  var tables = <TableModel>[];

  // This widget is the root of your application.
  _getTables() {
    print(widget.shopId);
    widget.apiServices.fetchTablesFromShop(widget.shopId).then((response) {
      setState(() {
        Iterable list = json.decode(response.body);
        tables = list.map((model) => TableModel.fromJson(model)).toList();
      });
    });
  }

  @override
  void initState() {
    super.initState();

    _getTables();
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
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () {
                    int numberTable = tables.length + 1;
                    TablePutModel tablePutModel = TablePutModel(
                        "Unit" + numberTable.toString(), widget.shopId, false);

                    widget.apiServices
                        .createTable(tablePutModel)
                        .then((value) => {
                              print(value.body),
                              widget.apiServices
                                  .fetchTablesFromShop(widget.shopId)
                                  .then((response) => {
                                        print(response.body),
                                        setState(() {
                                          Iterable list =
                                              json.decode(response.body);
                                          tables = list
                                              .map((model) =>
                                                  TableModel.fromJson(model))
                                              .toList();
                                        })
                                      })
                            });
                  },
                  child: Text('Add new Unit'),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      left: 8, right: 8, top: 8, bottom: 4),
                  child: Text("Units:",
                      style: TextStyle(fontSize: 18, color: Colors.white)),
                ),
                Expanded(
                  child: ListView.builder(
                    physics: const PageScrollPhysics(),
                    itemBuilder: (context, index) {
                      return Card(
                        shape: RoundedRectangleBorder(
                            side: BorderSide(color: Colors.grey),
                            borderRadius: BorderRadius.circular(15.0)),
                        child: Padding(
                          padding: const EdgeInsets.all(6.0),
                          child: ListTile(
                            leading: Container(
                              padding: EdgeInsets.only(right: 12.0),
                              decoration: new BoxDecoration(
                                  border: new Border(
                                      right: new BorderSide(
                                          width: 1.0, color: Colors.grey))),
                              child: Icon(Icons.storage),
                            ),
                            title: Text(tables[index].name),
                            trailing: displayTotal(tables[index]),
                            onTap: () {
                              if (tables[index].taken) {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => EditOrderPage(
                                              tables[index].id,
                                              apiServices: widget.apiServices,
                                              registerId: widget.registerId,
                                              shopId: widget.shopId,
                                            )));
                              } else {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => NewOrderPage(
                                              tables[index].id,
                                              apiServices: widget.apiServices,
                                              registerId: widget.registerId,
                                              shopId: widget.shopId,
                                            )));
                              }
                            },
                            // subtitle: displayOccupied(tables[index])
                          ),
                        ),
                      );
                    },
                    itemCount: tables.length,
                  ),
                ),
              ],
            );
          }),
        ],
      ),
    );
  }

  Widget displayOccupied(TableModel table) {
    if (table.taken) return Text("Occupied", style: TextStyle(fontSize: 12));
    return Container(
      height: 0,
      width: 0,
    );
  }

  Widget displayTotal(TableModel table) {
    Column column = Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 5),
          child: Icon(Icons.people),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: 5),
          child: Text(
              "Total: " + calculateTotal(table).toStringAsFixed(2) + " BAM",
              style: TextStyle(fontSize: 14, color: Colors.grey)),
        ),
      ],
    );
    if (table.taken) return column;
    return Container(
      height: 0,
      width: 0,
    );
  }

  double calculateTotal(TableModel table) {
    double total = 0;
    table.products.forEach((element) {
      total += element.quantity * element.price;
    });
    return total;
  }

  //Add code to display receipt on click
  // Widget orderDone(UserOrderModel order) {
  //   if (order.Done == true) {
  //     return FittedBox(
  //       child: Row(children: [
  //         IconButton(
  //             onPressed: () async {
  //               print("TU sam");
  //               final data = await fetchData(order);
  //               print(data.toString());
  //               final pdfFile = await PdfInvoiceApi.generate(data);
  //
  //               PdfApi.openFile(pdfFile);
  //             },
  //             icon: Icon(Icons.receipt_long_outlined)),
  //         Icon(
  //           Icons.download_done,
  //           color: Colors.green,
  //           size: 30.0,
  //         ),
  //       ]),
  //     );
  //   } else {
  //     return FittedBox(
  //       child: Row(children: [
  //         Icon(
  //           Icons.pending_actions,
  //           color: Colors.grey,
  //           size: 30.0,
  //         ),
  //       ]),
  //     );
  //   }
  // }

  static Future fetchData(UserOrderModel order) async {
    //final uri = Uri.parse('https://192.168.1.2:7194/api/ProductUserOrderIntertables/bill', queryParameters)

    final response = await http.post(
      Uri.parse(MyApp.getBaseUrl() + '/api/ProductUserOrderIntertables/bill'),
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
