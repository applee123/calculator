var symbol ='';   // 入力された計算記号
var total;　　     // 計算結果
var num_1 ='';    // 計算用の変数1
var num_2 ='';    // 計算用の変数2
var sum_flag = 0;  // 直前に計算が実行されているか判定用
var num_flag = 0;  //　直前に数字ボタンを押したか判定用
var equ_flag = 0;  // 直前に=ボタンを押したか判定用
var dot_flag = 0;   // 小数点を押したか判定用


//取得した数字、計算記号で計算し表示する
function calculation(num_1,num_2) {
  function sum(num_1,num_2) {
    switch (symbol) {
      case '+':
        return num_1 + num_2;
      case '-':
        return num_1 - num_2;
      case '*':
        return num_1 * num_2;
      case '/':
        return num_1 / num_2;
    }
  }
  total = sum(num_1,num_2)
  if (String(total).length > 14){  //14桁以上はエラーに
    $('.screen').text("error!")
  }else{
    $('.screen').text(total);
    sum_flag = 1
  }
}

//押された数字を表示する
function  p_screen(clickbtn){
  var screen_num = $('.screen').text();
  $('.screen').text(screen_num + clickbtn);
}

//押された計算記号を表示する
function p_symbol(symbol) {
  $('.symbol').text(symbol);
}

//小数点しか入力されてなければ0にする
function checkdot() {
  if ($('.screen').text() === "."){
  ($('.screen').text(".0"));
  }
}

//ACボタンを押したとき
$('.acbtn').click(function () {
  sum_flag = num_flag = equ_flag = dot_flag = 0;
  num_1 = num_2  =  total = symbol ="";
  $('.screen').text("");
  $('.symbol').text("");
});


  // 数字,小数点ボタンを押したとき
$('.numbtn').click(function(){
  if ($('.screen').text().length < 12){　　//12桁以上の入力を制限する
    num_flag = 1
    clickbtn = $(this).text();      //押したボタンの数字を取得
    if (clickbtn === "."){          //小数点を押したか判定
      if(dot_flag === 0){           //すでに小数点が押されているか判定
          dot_flag = 1
      }else{                        //すでに小数点が押されていればclickbtnを空にする
        clickbtn = ""
      }
    }
    if (sum_flag === 1 ){           //計算後か判定
      $('.screen').text("")
  　    p_screen(clickbtn);
      sum_flag = 0
      if(equ_flag === 1){　       //＝を押した後に数字を押したら初期化する
        num_1 = ''
        num_2 = ''
        equ_flag = 0
      }
    }else{
      p_screen(clickbtn);
      equ_flag = 0
    }
  };
})

//計算記号ボタンを押したとき
$('.symbol_btn').click(function () {
  equ_flag = 0
  dot_flag = 0
  if (num_1 === '' || sum_flag ===1){  //初回.計算後か判定
    num_1 =  Number($('.screen').text());
    symbol = $(this).text();
    p_symbol(symbol)
    $('.screen').text('');
    sum_flag = 0
    num_flag = 0
  }else if(num_flag === 1){ 　　　　//直前に数字を押してるか判定
    checkdot()
    num_2 = Number($('.screen').text());
    calculation(num_1,num_2)
    num_1 = total
    symbol = $(this).text();
    p_symbol(symbol)
    num_flag = 0
  }else{　　　　　　　　　　　　　　//計算記号を連続で押したときに計算処理をしないようにする
    symbol = $(this).text();
    p_symbol(symbol)
  }
});

// =ボタンを押したとき
$('.equal_btn').click(function () {　
  num_flag = 0
  dot_flag = 0
  equ_flag = 1
  if (sum_flag === 1){  //2回押したときの処理
    num_1 = total
    calculation(num_1,num_2)
  }else{
    checkdot()
    num_2 = Number($('.screen').text());
    calculation(num_1,num_2)
  }
})
