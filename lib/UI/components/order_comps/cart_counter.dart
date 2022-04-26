import 'package:flutter/material.dart';

import '../../../constants.dart';

class CartCounter extends StatefulWidget {

  const CartCounter({
    Key key,
  }) : super(key: key);

  @override
  _CartCounterState createState() => _CartCounterState();
}

class _CartCounterState extends State<CartCounter> {
  int numOfItems = 0;
  
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Padding(padding: EdgeInsets.only(left: 20)),
        buildOutlineButton(
          icon: Icons.remove,
          press: () {
            if (numOfItems > 0) {
              setState(() {
                numOfItems--;
                //currentCart.numOfItem--;
              });
            }
          },
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin / 2),
          child: Text(
            numOfItems.toString(),
            style: Theme.of(context).textTheme.headline5,
          ),
        ),
        buildOutlineButton(
            icon: Icons.add,
            press: () {
              setState(() {
                numOfItems++;
                //currentCart.numOfItem++;
              });
            }),
      ],
    );
  }

  SizedBox buildOutlineButton({IconData icon, Function press}) {
    return SizedBox(
      width: 40,
      height: 32,
      child: OutlineButton(
        padding: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(13),
        ),
        onPressed: press,
        child: Icon(icon, color: Colors.black,),
      ),
    );
  }
}
