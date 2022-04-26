import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'UI/background/background.dart';
import 'UI/forms/login_form.dart';


class CategoriesPage extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      home: Scaffold(
        body: Stack(
          children: [
            Background(),
            Text("Categories")
          ],
        ),
      ),
    );
  }
}