<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>重設帳號密碼</title>
</head>
<body>
    <h1>重設帳號密碼</h1>
    <p>帳號: {{ $mailData['帳號'] }}</p>
    <p><a href={{ $mailData['重設密碼網址'] }}>重設密碼網址: {{ $mailData['重設密碼網址'] }}</p>
</body>
</html>