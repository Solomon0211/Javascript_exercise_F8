function heighLight([first,...strings] , ...values ) {
    return values.reduce((accumulated, currentValue) => 
    [...accumulated,`<span>${currentValue}</span>`,strings.shift()] ,
     [first] );
}
hiểu như sau 
first là biến khởi tạo của accumulated
khi chạy thì first + currentValue + strings.shift() -> có được chuỗi học lập trình javascript tại và đưa vào accumulated và nó đang là 1 cái mảng
lặp tiếp theo thì ...accumulated có thể hiểu là bỏ đi dấu ngoặc mảng và thêm 2 giá trị F8 và ! vào 
cuối cùng có được Học lập trình - Javascript - tại -F8 - !
brand = 'F8'
course = 'Javascript'

const html = heighLight`Học lập trình ${course} tại ${brand} !`  ;
console.log(html)

 
// "Học lập trình "
// 1
// : 
// "<span>Javascript</span>"
// 2
// : 
// " tại "
// 3
// : 
// "<span>F8</span>"
// 4
// : 
// " !"