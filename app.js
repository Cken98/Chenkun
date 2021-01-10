// 错误处理的包  createError 
var createError = require('http-errors');
var express = require('express');
var path = require('path');

//导入cookie的包
var cookieParser = require('cookie-parser');

//导入session的包
var session = require('express-session');



//日志的一个引入包  暂时知道这些就行了  
var logger = require('morgan');
// 路由表
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var bannerRouter = require('./routes/banner');
var loginRouter = require('./routes/login')
var registerRouter = require("./routes/register");
//管理员
var DuserRouter = require('./routes/Duser');
var DusersRouter = require('./routes/Dusers');



var app = express();
// view engine setup
//设置ejs 引擎的一个寻找路径  
app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志   next() 会在底层内部执行  肉眼看不见
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
//配置 ejs  里面寻找的静态文件的一个路径  
app.use(express.static(path.join(__dirname, 'public')));




//cookie部分 使用
app.use(cookieParser())
//cookie保安， 在现实中直接映射看门大爷
// app.all('*', (req, res, next) => {
//   console.log('进入all，cookie保安');
//   console.log(req.cookies);
//   console.log('req.url', req.url);
//   //req.cookies.isLogin === 'ok':如果是注册用户，即已经给过cookie的就是自己人，直接下一步
//   //req.url === '/login'：非正常用户，看看登录页面长什么样，给你看看
//   //req.url === '/login/in' ：想买票，你不能阻止我注册，查询数据库的过程
//   if (req.cookies.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in' || req.url === '/register') {
//     next();
//   } else {
//     console.log('进入cookie保安');
//     // /user 
//     res.redirect('/login')
//   }

// })


//session 看门狗
//secret 加密的方法
// app.use(session({
//   secret: 'suibianxie',
//   //resave 强制保存 推荐false
//   resave: false,
//   //初始化session存储 默认true
//   saveUninitialized: true,
//   //设置过期时间
//   cookie: { maxAge: 1000 * 10 * 60 }
// }))


//session 守卫
// app.all('*', (req, res, next) => {
//   console.log('全局进入session守卫');
//   console.log(req.session);
//   if (req.session.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in' || req.url === '/register') {
//     console.log('进入req.session.isLogin===ok/login/login/in/register');
//     next()
//   }
//   else {
//     console.log('session 看门狗else');
//     res.redirect('/login')
//   }
// })





//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/banner', bannerRouter);
//注册登录
app.use("/register", registerRouter);
app.use('/login', loginRouter)
//管理员
app.use('/Duser', DuserRouter);



//以下两个是处理错误的 中间件！！！一个是 状态码错误处理 一个是全局错误处理
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
