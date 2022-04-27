import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pdf/pdf.dart';
import 'package:tasklist/categories_page.dart';
import 'package:tasklist/edit_order_page.dart';
import 'package:tasklist/UI/components/orders/orders_page.dart';
import 'package:tasklist/reciept_page.dart';

import 'UI/background/background.dart';
import 'UI/components/createOrder/new_order_page.dart';
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
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  static getBaseUrl() {
    return "https://10.0.2.2:7194";
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
      home: LoginScreen(),
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
    void onTapped(int index){
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
        if(widget.selectedIndex < 2) _selectedIndex = widget.selectedIndex;
        else _selectedIndex = 1;
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
          NewOrderPage(),
          OrderPage(),
          EditOrderPage(),

        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.add_chart), label: "Add Order"),
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
