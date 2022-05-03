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
import 'package:tasklist/UI/forms/cash_register.dart';
import 'package:tasklist/UI/forms/login_form.dart';
import 'package:tasklist/UI/forms/loginservice.dart';
import 'package:tasklist/login_page.dart';
import 'package:tasklist/main.dart';

class MockLoginService extends Mock implements LoginService{}

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

void main() {

  MockLoginService mockLoginService;

  setUp (() {
    mockLoginService = MockLoginService();
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
