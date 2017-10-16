/**
 * Created by frayd on 2017/5/14.
 */
var AppSQL={
    queryAll:'SELECT * FROM team065.BottleWatterDatabase WHERE ',
    checkTableExist:'create table if not exists BottleWatterDatabase(' +
    'tweetID VARCHAR(64) not null primary key,' +
    'headProfileImg VARCHAR(100) not null,' +
    'userName VARCHAR(45) not null,' +
    'screenName VARCHAR(45) not null,' +
    'authorPage VARCHAR(100) not null,' +
    'tweetTime VARCHAR(45) not null,' +
    'tweetText VARCHAR(200) not null,' +
    'tweetOriginalURL VARCHAR(100) not null,' +
    'tweetImg VARCHAR(100));',
    checkInfoExist:'select * from BottleWatterDatabase where tweetID= ?',
    addInfoFromTable:'insert into BottleWatterDatabase(tweetID,headProfileImg,userName,screenName,authorPage,tweetTime,tweetText,tweetOriginalURL,tweetImg) values(?,?,?,?,?,?,?,?,?)'
};
module.exports=AppSQL;