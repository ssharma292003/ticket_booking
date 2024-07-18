const mysql= require('mysql2');
function db(){

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:null,
    database:'ticket_booking' 
});
con.connect((err)=>{
    if (err){
        console.log(err);
    }
    else{
        con.query('SHOW TABLE LIKE "BOOKINGS"',(tables)=>{
            if(tables.length===0){
                console.log('connected successfully');
                var query = "CREATE TABLE BOOKINGS(ID INTEGER AUTO_INCREMENT PRIMARY KEY, MOVIE_NAME VARCHAR(255), TIME VARCHAR(255), SHOW_TIME VARCHAR(255), PEOPLE INTEGER, PRICE INTEGER, TOTAL_PRICE INTEGER)";
        
                // var query="CREATE TABLE BOOKINGS(INTEGER ID AUTO-INCREMENT,MOVIE_NAME VARCHAR,TIME VARCHAR,SHOW_TIME VARCHAR,PEOPLE INTEGER,PRICE INTEGER,TOTAL_PRICE INTEGER)";
                con.query(query,(err)=>{
                    console.log(err);
                })
            }
            else{
                console.log('table already exist');
            }
        })
       
    }
});
return con;
}
module.exports=db;