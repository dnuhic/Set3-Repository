import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tasklist/UI/components/order_comps/cart_counter.dart';
import 'package:tasklist/constants.dart';

import '../../../size_config.dart';

class CartCard extends StatelessWidget {
  const CartCard({
    Key key,
  }) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(5),
      decoration: BoxDecoration(
        //border: Border.all(color: Color(0xfff3c526e), width: 2),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 88,
            child: AspectRatio(
              aspectRatio: 1,
              child: Container(
                padding: EdgeInsets.all(getProportionateScreenWidth(10.toDouble())),
                decoration: BoxDecoration(
                  color: Color(0xfff3c526e).withAlpha(200),
                  borderRadius: BorderRadius.circular(16),
                  //border: Border.all(color: Color(0xfff3c526e), width: 2)
                ),
                child: Icon(Icons.inventory, color: Colors.white, size: 60,)
              ),
            ),
          ),
          SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Jabuka 1kg",
                style: TextStyle(color: Colors.black, fontSize: 20),
                maxLines: 2,
              ),
              SizedBox(height: 10),
              Text.rich(
                TextSpan(
                  text: "100KM",
                  style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black),
                ),
              )
            ],
          ),
          CartCounter(),
        ],
      ),
    );
  }
}