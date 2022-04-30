import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite/sqlite_api.dart';
import 'package:tasklist/UI/components/editOrder/edit_order_page.dart';
import 'package:tasklist/edit_order_page.dart';
import 'package:tasklist/UI/components/orders/orders_page.dart';
import 'package:tasklist/reciept_page.dart';

import 'Database.dart';
import 'UI/background/background.dart';
import 'UI/components/createOrder/new_order_page.dart';
import 'UI/components/tables/tables_page.dart';
import 'login_page.dart';
import 'orders_list_page.dart';
//import 'login_page.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() {
  HttpOverrides.global = MyHttpOverrides();
  WidgetsFlutterBinding.ensureInitialized();
  final database = SQLiteDbProvider.db.database;
  runApp(MyApp(
    futureRegister: SQLiteDbProvider.db.getRegister(),
  ));
}

class MyApp extends StatelessWidget {
  final Future<InstalledRegister> futureRegister;

  MyApp({Key key, this.futureRegister}) : super(key: key);

  static getBaseUrl() {
    //return "https://set3.azurewebsites.net";
    return "https://10.2.2.2";
  }
  static getShopId() {
    return 1;
  }

  static getCashRegisterId() {
    return 1;
  }

  static int userId;

  static InstalledRegister register;

  setRegister() {
    futureRegister.then((value) => {register = value});
  }

  getHomePage() {
    setRegister();

    //return MyHomePage(2);
    if (register != null && register.registerId != 0 && register.shopId != 0) {
      return MyHomePage(0);
    }
    return LoginScreen();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SET3_android',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: getHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  int selectedIndex;

  MyHomePage(this.selectedIndex);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  PageController pageController = PageController();
  void onTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    pageController.jumpToPage(index);
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    pageController = PageController(initialPage: widget.selectedIndex);
    setState(() {
      if (widget.selectedIndex < 3)
        _selectedIndex = widget.selectedIndex;
      else
        _selectedIndex = 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,

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
      body: PageView(
        physics: NeverScrollableScrollPhysics(),
        controller: pageController,
        children: [
          TablePage(),
          OrderPage(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.list), label: "Tables"),
          BottomNavigationBarItem(icon: Icon(Icons.list), label: "Orders"),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color(0xfff3c526e),
        unselectedItemColor: Colors.grey,
        onTap: onTapped
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}