import 'dart:async' as async;
import 'dart:convert' as convert;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/main.dart';

import '../createOrder/saved_order_body.dart';

class APIServices {
  String baseUrl = "https://10.0.2.2:7206";

  static Future fetchUserOrder() async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/UserOrderModels'));
  }

  static Future fetchStores() async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/shopmodels/notDeletedShops'));
  }

  static Future fetchProducts(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/productsFromShop/' + id.toString()));
  }

  static Future sendOrder(SavedOrderBody body, String action) async {
    return await http
        .post(Uri.parse(
        MyApp.getBaseUrl() + '/api/userordermodels/' + action),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body));
  }
}


