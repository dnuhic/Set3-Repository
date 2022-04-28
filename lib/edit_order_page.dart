// import 'package:flutter/material.dart';
// import 'package:flutter_svg/svg.dart';
// import 'package:tasklist/UI/components/order_comps/cart_card.dart';
// import 'package:tasklist/size_config.dart';
// import 'UI/background/background.dart';
//
//
// class EditOrderPage extends StatelessWidget {
//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     var size = MediaQuery.of(context).size;
//     SizeConfig().init(context);
//     return MaterialApp(
//       title: 'Material App',
//       home: Scaffold(
//         body: Stack(
//           children: [
//             Background(),
//             Column(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Padding(
//                   padding: const EdgeInsets.only(left: 10, top: 20),
//                   child: Text(
//                     "Konzum Centar",
//                     style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w500 ,color: Colors.black)
//                   ),
//                 ),
//                 Padding(
//                   padding: const EdgeInsets.only(left: 10),
//                   child: Text(
//                     "Edit Order",
//                     style: TextStyle(fontWeight: FontWeight.w200 ,color: Colors.black, fontSize: 26)
//                   ),
//                 ),
//                 Container(
//                   height: size.height*0.55,
//                   child: Padding(
//                     padding:
//                         EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(5)),
//                     child: Flexible(
//                       child: ListView(
//
//                         scrollDirection: Axis.vertical,
//                         shrinkWrap: true,
//                         children: [
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: Dismissible(
//                               key: Key("1"),
//                               direction: DismissDirection.endToStart,
//                               onDismissed: (direction) {
//                                 // setState(() {
//                                 //   demoCarts.removeAt(index);
//                                 //   super.setState(() {});
//                                 // });
//                               },
//                               background: Container(
//                                 padding: EdgeInsets.symmetric(horizontal: 20),
//                                 decoration: BoxDecoration(
//                                   color: Color.fromARGB(130, 185, 44, 19),
//                                   borderRadius: BorderRadius.circular(15),
//                                 ),
//                                 child: Row(
//                                   children: [
//                                     Spacer(),
//                                     SvgPicture.asset("assets/icons/back.svg"),
//                                   ],
//                                 ),
//                               ),
//                               child: CartCard(),
//                             ),
//                           ),
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: CartCard(),
//                           ),
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: CartCard(),
//                           ),
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: CartCard(),
//                           ),
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: CartCard(),
//                           ),
//                           Padding(
//                             padding: EdgeInsets.symmetric(vertical: 5),
//                             child: CartCard(),
//                           ),
//                         ],
//                       ),
//                     ),
//                   ),
//                 ),
//                 Spacer(),
//                 Padding(
//                   padding: const EdgeInsets.all(6.0),
//                   child: ElevatedButton(
//                     style: ElevatedButton.styleFrom(
//                       primary: Color(0xfff3c526e),
//                       minimumSize: const Size.fromHeight(50), // NEW
//                     ),
//                     onPressed: () {},
//                     child: Text(
//                     "Save Order",
//                     style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w200 ,color: Colors.white)
//                   ),
//                   ),
//                 ),
//                 Padding(
//                   padding: const EdgeInsets.all(6.0),
//                   child: ElevatedButton(
//                     style: ElevatedButton.styleFrom(
//                       primary: Color(0xfff3c526e),
//                       minimumSize: const Size.fromHeight(50), // NEW
//                     ),
//                     onPressed: () {},
//                     child: Text(
//                     "Delete Order",
//                     style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w200 ,color: Colors.white)
//                   ),
//                   ),
//                 ),
//               ],
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }