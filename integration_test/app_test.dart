// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/UI/components/orders/api.services.dart';

import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/orders_page.dart';
import 'package:tasklist/UI/components/tables/tables_page.dart';
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

  final userOrderModel = http.Response('[' + 
    '{"id":1,"done":true,"updatedDate":"2022-05-03 11:56:13.2081355","shopId":1,"userId":1,"cashRegisterId":1}' +
  ']', 200);

  final SavedOrderBody savedOrderBody = SavedOrderBody(1, 1, 1, 1, [ProductQuantitys(1, 3)].toList());

  void arrangeApiService () {
    when(() => mockAPIServices.fetchDoneUserOrders(1)).thenAnswer((_) async {return orders1;});
    when(() => mockAPIServices.fetchProducts(1)).thenAnswer((_) async {return products1;});
    
    when(() => mockAPIServices.fetchTablesFromShop(1)).thenAnswer((_) async {return tables1;});
    when(() => mockAPIServices.fetchTablesFromShop(2)).thenAnswer((_) async {return tables2;});
    
    when(() => mockAPIServices.sendOrder(savedOrderBody,'save')).thenAnswer((_) async {return userOrderModel;});
    when(() => mockAPIServices.sendOrder(savedOrderBody,'finish')).thenAnswer((_) async {return userOrderModel;});
    
  }
  

  // testWidgets('Checks if NewOrderPage saves order and EditOrderPage pulls shows state of that order', (WidgetTester tester) async {
    
  //   arrangeApiService();
  //   await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
  //   await tester.pump();

  //   await tester.tap(find.widgetWithText(Card,'Prva tabela'));
  //   await tester.pumpAndSettle();

  //   await tester.tap(find.byKey(Key("Jabuka" + '-create-outlined')));
  //   await tester.pumpAndSettle();
  //   await tester.enterText(find.byType(TextField), '3.0');
  //   await tester.pumpAndSettle();
  //   await tester.tap(find.text('Confirm'));
  //   await tester.pumpAndSettle();
    
  //   await tester.tap(find.text('Save'));
  //   await tester.pumpAndSettle();

  //   expect(find.widgetWithText(Card, 'Total: 30.00 BAM'), findsOneWidget);
  //   await tester.tap(find.widgetWithText(Card,'Prva tabela'));
  //   await tester.pumpAndSettle();
  //   expect(find.text('Total: 30.00 BAM'), findsOneWidget);
  //   expect(find.widgetWithText(FittedBox, '3.00'), findsWidgets);

  // });

  testWidgets('Checks if NewOrderPage order button returns to OrderPage', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(Key("Jabuka" + '-create-outlined')));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), '3.0');
    await tester.pumpAndSettle();
    await tester.tap(find.text('Confirm'));
    await tester.pumpAndSettle();
    
    await tester.tap(find.text('Order'));
    await tester.pumpAndSettle();

    expect(find.byType(OrderPage), findsOneWidget);

  });

  testWidgets('Checks if NewOrderPage save button returns to TablePage', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(Key("Jabuka" + '-create-outlined')));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), '3.0');
    await tester.pumpAndSettle();
    await tester.tap(find.text('Confirm'));
    await tester.pumpAndSettle();
    
    await tester.tap(find.text('Save'));
    await tester.pumpAndSettle();

    expect(find.byType(TablePage), findsOneWidget);

  });

  testWidgets('Checks if NewOrderPage custom quantity button works', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    
    expect(find.widgetWithText(ListTile,"Jabuka"), findsOneWidget);
    expect(find.text('Total : 0.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key("Jabuka" + '-create-outlined')));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), '3.0');
    await tester.pumpAndSettle();
    await tester.tap(find.text('Confirm'));
    await tester.pumpAndSettle();

    expect(find.text('Total : 30.00 BAM'), findsOneWidget);
  });

  testWidgets('Checks if NewOrderPage custom quantity CANCEL button works', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    
    expect(find.widgetWithText(ListTile,"Jabuka"), findsOneWidget);
    expect(find.text('Total : 0.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key("Jabuka" + '-create-outlined')));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), '3.0');
    await tester.pumpAndSettle();
    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();

    expect(find.text('Total : 0.00 BAM'), findsOneWidget);
  });

  testWidgets('Checks if NewOrderPage add and remove buttons work #1', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    
    expect(find.widgetWithText(ListTile,"Jabuka"), findsOneWidget);
    expect(find.text('Total : 0.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-add-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 10.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-add-circle')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(Key('Jabuka-add-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 30.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-remove-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 20.00 BAM'), findsOneWidget);
    
  });

  testWidgets('Checks if NewOrderPage add and remove buttons work #2', (WidgetTester tester) async {
    
    arrangeApiService();
    await tester.pumpWidget(createHomePage(mockAPIServices,1,1));
    await tester.pump();

    await tester.tap(find.widgetWithText(Card,'Prva tabela'));
    await tester.pumpAndSettle();

    
    expect(find.widgetWithText(ListTile,"Jabuka"), findsOneWidget);
    expect(find.text('Total : 0.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-add-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 10.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-add-circle')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(Key('Visnja-add-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 35.00 BAM'), findsOneWidget);
    await tester.tap(find.byKey(Key('Jabuka-remove-circle')));
    await tester.pumpAndSettle();
    expect(find.text('Total : 25.00 BAM'), findsOneWidget);
    
  });

  testWidgets('Checks if there is content in shops', (WidgetTester tester) async {
    
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();
    
    await tester.tap(find.byKey(Key("drop-down-shop")));
    await tester.pumpAndSettle();

    expect(find.text(' Prvi shop').last, findsOneWidget);
    expect(find.text(' Drugi shop').last, findsOneWidget);
    expect(find.text(' Treci shop').last, findsOneWidget);

    await tester.tap(find.text(' Drugi shop').last);
    await tester.pumpAndSettle();
  
  });

  testWidgets('Checks if there is content in cashregister and if it changes after click', (WidgetTester tester) async {
    
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();
    
    await tester.tap(find.byKey(Key("drop-down-cashregister")));
    await tester.pumpAndSettle();

    expect(find.text(' Prva kasa').last, findsOneWidget);
    expect(find.text(' Druga kasa'), findsNothing);
    expect(find.text(' Treca kasa'), findsNothing);

    await tester.tap(find.text(' Prva kasa').last);
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(Key("drop-down-shop")));
    await tester.pumpAndSettle();
    await tester.tap(find.text(' Drugi shop').last);
    await tester.pumpAndSettle();

    expect(find.text(' Prva kasa'), findsNothing);
    expect(find.text(' Druga kasa'), findsOneWidget);
    expect(find.text(' Treca kasa'), findsNothing);
  
  });

  testWidgets('Checks if login leads to orders', (WidgetTester tester) async {
    
    arrangeLoginService();
    await tester.pumpWidget(createLoginPage(mockLoginService));
    await tester.pump();
    
    await tester.tap(find.byKey(Key('login-btn')));
    await tester.pumpAndSettle();

    expect(find.byType(LoginScreen), findsNothing);
    expect(find.byType(MyHomePage), findsOneWidget);
    
  });

}
