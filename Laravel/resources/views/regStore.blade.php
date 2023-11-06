<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>審核成功</title>
</head>
<body>
    <h1>審核成功</h1>
    <p>店家: {{ $mailData['resturant_name'] }}</p>
    <p><a href={{ $mailData['url'] }}>開通網址: {{ $mailData['url'] }}</p>
</body>
</html>