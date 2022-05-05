// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/UI/components/orders/api.services.dart';

import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/orders_page.dart';
import 'package:tasklist/UI/forms/cash_register.dart';
import 'package:tasklist/UI/forms/login_form.dart';
import 'package:tasklist/UI/forms/loginservice.dart';
import 'package:tasklist/login_page.dart';
import 'package:tasklist/main.dart';

class MockLoginService extends Mock implements LoginService{}
class MockAPIServices extends Mock implements APIServices{}

Widget createLoginPage(MockLoginService mockLoginService){
  return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SET3_android',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: LoginScreen(loginService: mockLoginService,),
    );
  }

Widget createHomePage(MockAPIServices mockApiService, int registerId, int shopId){
  return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SET3_android',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(0, apiServices: mockApiService, registerId: registerId, shopId: shopId,),
    );
  }

void main() {

  MockLoginService mockLoginService;
  MockAPIServices mockAPIServices;
  setUp (() {
    mockLoginService = MockLoginService();
    mockAPIServices = MockAPIServices();
  });

  final shops = http.Response('[' + 
    '{"id":1,"name":"Prvi shop"},' +
    '{"id":2,"name":"Drugi shop"},' +
    '{"id":3,"name":"Treci shop"}' +
  ']', 200);

  final cashRegisters = [ 
     http.Response('[{"id":1,"name":"Prva kasa","installed":1}]',200),
     http.Response('[{"id":2,"name":"Druga kasa","installed":1}]',200),
     http.Response('[{"id":3,"name":"Treca kasa","installed":1}]',200),
  ];

  

  void arrangeLoginService () {
    // when(() => mockLoginService.fetchStores()).thenAnswer((_) async {await Future.delayed(const Duration(seconds: 2)); return shops; });
    // when(() => mockLoginService.fetchCashRegistersFromShop(1)).thenAnswer((_) async {await Future.delayed(const Duration(seconds: 2)); return cashRegisters[0];});
    // when(() => mockLoginService.fetchCashRegistersFromShop(2)).thenAnswer((_) async {await Future.delayed(const Duration(seconds: 2)); return cashRegisters[1];});
    // when(() => mockLoginService.fetchCashRegistersFromShop(3)).thenAnswer((_) async {await Future.delayed(const Duration(seconds: 2)); return cashRegisters[2];});
    when(() => mockLoginService.fetchStores()).thenAnswer((_) async {return shops; });
    when(() => mockLoginService.fetchCashRegistersFromShop(1)).thenAnswer((_) async {return cashRegisters[0];});
    when(() => mockLoginService.fetchCashRegistersFromShop(2)).thenAnswer((_) async {return cashRegisters[1];});
    when(() => mockLoginService.fetchCashRegistersFromShop(3)).thenAnswer((_) async {return cashRegisters[2];});
    
  }

  final tables1 = http.Response('[' +
    '{"id":1,"name":"Prva tabela","shopId":1,"taken":false,"products":[{"id":1,"name":"Jabuka","quantity":5,"price":10,"measuringunit":"Gram"}]}' +  
  ']', 200);

  final tables2 = http.Response('[' +  
    '{"id":2,"name":"Druga tabela","shopId":2,"taken":false,"products":[{"id":1,"name":"Jabuka","quantity":5,"price":10,"measuringunit":"Gram"}, {"id":2,"name":"Kruska","quantity":5,"price":20,"measuringunit":"Gram"}]},' +  
    '{"id":3,"name":"Treca tabela","shopId":2,"taken":false,"products":[{"id":3,"name":"Visnja","quantity":5,"price":15,"measuringunit":"Gram"}]}' +  
  ']', 200);

  final orders1 = http.Response('['+
    '{"id":1,"done":true,"updatedDate":"2022-05-03 11:56:13.2081355","shopId":1,"userId":1,"cashRegisterId":1,"tableId":1},' +
    '{"id":2,"done":true,"updatedDate":"2022-05-03 11:56:13.2081355","shopId":1,"userId":1,"cashRegisterId":1,"tableId":1},' + 
    '{"id":3,"done":true,"updatedDate":"2022-05-02 13:23:13.2081355","shopId":1,"userId":1,"cashRegisterId":1,"tableId":1}' 
  ']', 200);

  final products1 = http.Response('[' + 
    '{"productId":1,"name":"Jabuka","quantity":5,"price":10,"measuringUnit":"Gram","barcode":"barcode","barcodeText":"barcodetext"},' + 
    '{"productId":2,"name":"Kruska","quantity":5,"price":20,"measuringUnit":"Gram","barcode":"barcode","barcodeText":"barcodetext"},' + 
    '{"productId":3,"name":"Visnja","quantity":5,"price":15,"measuringUnit":"Gram","barcode":"barcode","barcodeText":"barcodetext"}' + 
  ']', 200);
  void arrangeApiService () {
    when(() => mockAPIServices.fetchDoneUserOrders(1)).thenAnswer((_) async {return orders1;});
    when(() => mockAPIServices.fetchProducts(1)).thenAnswer((_) async {return products1;});
    //when(() => mockAPIServices.fetchProductsFromUserOrder(id))
    when(() => mockAPIServices.fetchTablesFromShop(1)).thenAnswer((_) async {return tables1;});
    when(() => mockAPIServices.fetchTablesFromShop(2)).thenAnswer((_) async {return tables2;});
    //when(() => mockAPIServices.fetchUserOrderFromTable(id))
    //when(() => mockAPIServices.sendOrder(id))
    //when(() => mockAPIServices.sendOrderEdit(id))
    //when(() => mockAPIServices.deleteOrder(id))
  }
  
  testWidgets('Checks if there are products in NewOrderPage #1', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    expect(find.byType(ListTile), findsWidgets);
    expect(find.byType(ListTile), findsNWidgets(3));
    expect(find.widgetWithText(ListTile,"Jabuka"), findsOneWidget);
    expect(find.widgetWithText(ListTile,"Kruska"), findsOneWidget);
    expect(find.widgetWithText(ListTile,"Visnja"), findsOneWidget);

    expect(find.widgetWithText(ListTile, '10.0 BAM (Gram)'), findsOneWidget);
    expect(find.widgetWithText(ListTile, '20.0 BAM (Gram)'), findsOneWidget);
    expect(find.widgetWithText(ListTile, '15.0 BAM (Gram)'), findsOneWidget);
    //items[index].Price.toString() + " BAM" + ' (' + items[index].measuringUnit + ')',


    
  });
  testWidgets('Checks if there are orders in OrderPage #1', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.byKey(Key('orders')));
    await tester.pumpAndSettle();

    expect(find.byType(ListTile), findsWidgets);
    expect(find.byType(ListTile), findsNWidgets(3));
    expect(find.widgetWithText(ListTile,"Order ID: #1"), findsOneWidget);
    expect(find.widgetWithText(ListTile,"Order ID: #2"), findsOneWidget);
    expect(find.widgetWithText(ListTile,"Order ID: #3"), findsOneWidget);
    
  });
  

  testWidgets('Checks if there are tables in TablePage #1', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    expect(find.text('Tables'), findsOneWidget);
    expect(find.text('Prva tabela'), findsOneWidget);
    expect(find.text('Druga tabela'), findsNothing);
    expect(find.byType(Card), findsWidgets);
    

  });

  testWidgets('Checks if there are tables in TablePage #1', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    expect(find.text('Tables'), findsOneWidget);
    expect(find.text('Prva tabela'), findsOneWidget);
    expect(find.text('Druga tabela'), findsNothing);
    expect(find.byType(Card), findsWidgets);
    

  });

  testWidgets('Checks if there are tables in TablePage #2', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,2,2));
    await tester.pump();

    expect(find.text('Prva tabela'), findsNothing);
    expect(find.text('Druga tabela'), findsOneWidget);
    expect(find.text('Treca tabela'), findsOneWidget);
    expect(find.byType(Card), findsWidgets);
    

  });

  

  testWidgets('Checks if there is text', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();
    // Verify that our counter starts at 0.
    expect(find.text('Login'), findsOneWidget);
    expect(find.byKey(Key("drop-down-shop")), findsOneWidget);
    expect(find.byKey(Key("drop-down-cashregister")), findsOneWidget);

    
    // Tap the '+' icon and trigger a frame.
    // await tester.tap(find.byIcon(Icons.add));
    // await tester.pump();

    // // Verify that our counter has incremented.
    // expect(find.text('0'), findsNothing);
    // expect(find.text('1'), findsOneWidget);
  });

  testWidgets('Checks if there is content in shops', (WidgetTester tester) async {
    
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();

    expect(find.text(' Prvi shop'), findsOneWidget);
    expect(find.text(' Drugi shop'), findsOneWidget);
    expect(find.text(' Treci shop'), findsOneWidget);
    expect(find.text(' Cetvrti shop'), findsNothing);

  });


  testWidgets('Checks if there is content in cashregister with first as default ', (WidgetTester tester) async {
    
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();

    expect(find.text(' Prva kasa'), findsOneWidget);
    expect(find.text(' Druga kasa'), findsNothing);
    expect(find.text(' Treca kasa'), findsNothing);
  
  });

  
}
