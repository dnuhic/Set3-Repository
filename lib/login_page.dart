import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tasklist/UI/forms/loginservice.dart';

import 'UI/background/background.dart';
import 'UI/forms/login_form.dart';


class LoginScreen extends StatelessWidget {
  final LoginService loginService;

  LoginScreen({this.loginService});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      home: Scaffold(
        body: Stack(
          children: [
            Background(),
            LoginForm(loginService: loginService,)
          ],
        ),
      ),
    );
  }
}