import 'dart:async' as async;
import 'dart:convert' as convert;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/userordermodel.dart';
import 'package:tasklist/UI/components/receipt/model/invoice.dart';
import 'package:tasklist/main.dart';
import 'package:xml/xml.dart';

import '../createOrder/saved_order_body.dart';
import 'dart:developer' as developer;

class APIServices {
  //String baseUrl = "https://10.0.2.2:7206";
  String tringURL = "http://10.0.2.2:8085";

  // Future getFiscalizationXML () async {
  //   return await http.get(Uri.parse(tringURL + '/sfr'));
  // }

  Future sendFiscalizationXML (XmlDocument body) async {

    //developer.log("OVDJE SMO" + body.toString());
    return await http
        .post(Uri.parse(tringURL + '/sfr'),
      headers: <String, String>{
        'Content-Type': 'text/xml; charset=UTF-8',
      },
      body: body.toXmlString());
  }

  Future fetchData(UserOrderModel order) async {

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

  Future fetchDoneUserOrders(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/UserOrderModels/myuserorders/' + id.toString()));
  }

  Future fetchStores() async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/shopmodels/notDeletedShops'));
  }

  Future fetchProducts(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/productsFromShop/' + id.toString()));
  }

  Future sendOrder(SavedOrderBody body, String action) async {
    return await http
        .post(Uri.parse(
        MyApp.getBaseUrl() + '/api/userordermodels/' + action),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body));
  }

  Future sendOrderEdit(SavedOrderBody body, String action, int userOrderId) async {
    return await http
        .put(Uri.parse(
        MyApp.getBaseUrl() + '/api/userordermodels/' + action + "/" + userOrderId.toString()),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body));
  }

  Future deleteOrder(int id) async {
    return await http
        .delete(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/' + id.toString()));
  }

  Future fetchCashRegistersFromShop(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/cashregistermodels/cashregisterfromshop/' + id.toString()));
  }

  Future fetchProductsFromUserOrder(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/savedUserOrderProducts/' + id.toString()));
  }

  Future fetchTablesFromShop(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/tablemodels/tablesWithProductsFromShop/' + id.toString()));
  }

  Future fetchUserOrderFromTable(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/userOrderFromTable/' + id.toString()));
  }
}


