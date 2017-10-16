var express = require('express');
var router = express.Router();
var Twit=require('twit');
//transform interface
var utf8=require('utf8');

//interface
var mysql=require('mysql');
var dbCongfig=require('../db/DBConfig');
var appSQL=require('../db/appsql');

//DBpedia interface
var SparqlClient=require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';
var DBpeidaClient = new SparqlClient(endpoint);

//players twitter --DBpedia List
var playersCorrespondList=require('../playersCorrespondingList/playersList');

//use DBConfig.js to create a Mysql connection pool
var pool=mysql.createPool(dbCongfig.mysql);


var config={
    consumer_key:'VsRTgGXnYH0gsGW85EoJCZUSi'
    ,consumer_secret:'jxEVGUeR5E7rHLx9uS6QnJadDQCT8B5JZSKvtHdBgVFQfduFla'
    ,access_token:'846075906192019457-7sX8EUH3t1CmavXxd1uZOCcIa830IzN'
    ,access_token_secret:'71ihube8ligDOYpwm6xCdGlJJXZQgPBtetdNSIyVi98D9'
};

var client = new Twit(config);


var screen_name;
var text;
var headImg;
var userName;
var time;
var originTweetURL;
var authorPageURL;
var tweetsList=[];
var DBpediaList='';
var tweetFrequency=[0,0,0,0,0,0,0];

router.post('/search', function(req, res, next){
    var players=req.body.players;//search by player's information
    var footBallTeams=req.body.footBallTeams;//search by football team's information
    var authorOfTweets = req.body.authorOfTweets;//search by twitter's screen_name

    var queryDataBaseOnly=req.body.queryDatabaseOnly;//if search in database only


    var searchContent=players+' '+footBallTeams;
    if (authorOfTweets!=''){
        searchContent+=' '+'from:'+authorOfTweets;

        if(playersCorrespondList.hasOwnProperty(authorOfTweets)){
            //DBpedia handle
            var playerDBpediaName=playersCorrespondList[authorOfTweets];

            console.log('DBpediaName*****'+playerDBpediaName);

            var DBpediaQuery = "PREFIX type: <http://dbpedia.org/class/yago/>"+
                "SELECT ?name ?birthDay  ?team ?position"+
                "\n"+
                "WHERE" +
                "{"+
                "<http://dbpedia.org/resource/"+playerDBpediaName+"> a type:YagoLegalActor;"+
                "dbp:name ?name;"+
                "dbo:birthDate ?birthDay;"+
                "dbp:currentclub ?team;"+
                "dbo:position ?position"+
                "\n"+
                "FILTER ( langMatches(lang(?name), 'en'))" +
                "}";
            // console.log(DBpediaQuery);
            DBpeidaClient.query(DBpediaQuery).execute(function(error, results) {
                if(!error){
                    var playerName=results.results.bindings[0].name.value;//球员姓名
                    var playerCurrentClub=results.results.bindings[0].team.value.split('/').pop().replace(/_/g,' ');//player's current club
                    var playerPosition='';//player's position
                    for(var i=0;i<results.results.bindings.length;i++){
                        var temp=results.results.bindings[i].position.value.split('/').pop().split('_')[0];
                        if(i!=0){
                            playerPosition+='/';
                        }
                        playerPosition+=temp;
                    }
                    var playerBirthDay=results.results.bindings[0].birthDay.value;//player's birthday
                    DBpediaList={
                        playerName:playerName,
                        playerCurrentClub:playerCurrentClub,
                        playerPosition:playerPosition,
                        playerBirthDay:playerBirthDay
                    };
                }
                else {
                    console.log(error);
                }
            });
        }
    }


    if(searchContent!=' '){
        if(queryDataBaseOnly=='false'){//catch data from twitter's API
            console.log("catch data from twitter's API");
            var tweetReturnResults=[];
            var tweetReturnMax_id='';


            client.get('search/tweets',{q:searchContent,
                result_type: 'recent',count:100},function(error, data, res) {
                tweetReturnResults = tweetReturnResults.concat(data.statuses);
                tweetReturnMax_id = data.statuses[data.statuses.length - 1].id_str;

                client.get('search/tweets',{q:searchContent,
                    result_type: 'recent',count:100,max_id:tweetReturnMax_id},function(error, data, res){
                    tweetReturnResults = tweetReturnResults.concat(data.statuses);
                    tweetReturnMax_id = data.statuses[ data.statuses.length - 1 ].id_str;

                    client.get('search/tweets',{q:searchContent,
                        result_type: 'recent',count:100,max_id:tweetReturnMax_id},function(error, data, res){
                        tweetReturnResults = tweetReturnResults.concat(data.statuses);


                        for (var index=0;index<tweetReturnResults.length;index++) {
                            var tweet= tweetReturnResults[index];
                            var tweetID=tweet.id_str;
                            var tweet_Img='';
                            screen_name=tweet.user.screen_name;
                            text=tweet.text;
                            var textList=text.split('https://');
                            headImg=tweet.user.profile_image_url;
                            userName= tweet.user.name;
                            var temp1 =tweet.created_at;
                            var tempArr=temp1.split('+0000');
                            var temp2=tempArr.join('');
                            time=temp2;
                            //频率
                            if(parseTwitterDate(time)!=7){
                                tweetFrequency[parseTwitterDate(time)]++;
                            }

                            authorPageURL='https://twitter.com/'+tweet.user.screen_name;
                            originTweetURL="https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
                            if (tweet.entities.hasOwnProperty("media")){
                                tweet_Img=tweet.entities.media[0].media_url;
                            }
                            tweetsList[index]={
                                tweetID:tweetID,
                                screen_name:screen_name,
                                tweetText:textList[0],
                                headProfileImg:headImg,
                                userName:userName,
                                time:time,
                                originTweetURL:originTweetURL,
                                tweetImg:tweet_Img,
                                authorPage:authorPageURL
                            }
                        }

                    });
                });

            });

            res.json({
                message:'success',
                data:''
            });


            tweetReturnMax_id='';
            tweetReturnResults=[];


        }
        else {//catch data from database
            pool.getConnection(function (err,connection) {
                var searchPlayers='';
                var searchFootballTeams='';
                var searchAuthorOFTweets='';
                //player's information
                if(players!=''){
                    var playerParamsList=players.split(' OR ');
                    if(playerParamsList.length==1){
                        searchPlayers+='tweetText like "%'+playerParamsList[0]+'%"';
                    }
                    else if(playerParamsList.length==2){
                        searchPlayers+='(tweetText like "%'+playerParamsList[0]+'%" OR tweetText like "%'+playerParamsList[1]+'%")';
                    }
                    else {
                        searchPlayers+='(tweetText like "%'+playerParamsList[0]+'%" OR tweetText like "%'+playerParamsList[1]+'%" OR tweetText like "%'+playerParamsList[2]+'%")';
                    }
                }

                //football team's search information
                if(footBallTeams!=''){
                    var footBallTeamsParamsList=players.split(' OR ');
                    if(footBallTeamsParamsList.length==1){
                        searchFootballTeams+='tweetText like "%'+footBallTeamsParamsList[0]+'%"';
                    }
                    else if(footBallTeamsParamsList.length==2){
                        searchFootballTeams+='(tweetText like "%'+footBallTeamsParamsList[0]+'%" OR tweetText like "%'+footBallTeamsParamsList[1]+'%")';
                    }
                    else {
                        searchFootballTeams+='(tweetText like "%'+footBallTeamsParamsList[0]+'%" OR tweetText like "%'+footBallTeamsParamsList[1]+'%" OR tweetText like "%'+footBallTeamsParamsList[2]+'%")';
                    }
                }

                //author search information
                if(authorOfTweets!=''){
                    searchAuthorOFTweets='screenName="'+authorOfTweets+'"';
                }

                //total search information
                var queryDatabase='';
                if(searchPlayers!=''){
                    queryDatabase+=searchPlayers;
                }
                if(searchFootballTeams!=''){
                    if(queryDatabase!=''){
                        queryDatabase+=' And '+searchFootballTeams;
                    }
                    else {
                        queryDatabase+=searchFootballTeams;
                    }
                }
                if(searchAuthorOFTweets!=''){
                    if(queryDatabase!=''){
                        queryDatabase+=' And '+searchAuthorOFTweets;
                    }
                    else {
                        queryDatabase+=searchAuthorOFTweets;
                    }
                }
                console.log('queryDatabase----------'+queryDatabase);
                //database search
                if(queryDatabase!=''){
                    connection.query(appSQL.queryAll+queryDatabase,function (err,result) {
                        if(!err){
                            for(var i=0;i<result.length;i++){
                                //frequency
                                if(parseTwitterDate(result[i].tweetTime)!=7) {
                                    tweetFrequency[parseTwitterDate(result[i].tweetTime)]++;
                                }
                                tweetsList[i]={
                                    tweetID:result[i].tweetID,
                                    screen_name:result[i].screenName,
                                    tweetText:result[i].tweetText,
                                    headProfileImg:result[i].headProfileImg,
                                    userName:result[i].userName,
                                    time:result[i].tweetTime,
                                    originTweetURL:result[i].tweetOriginalURL,
                                    tweetImg:result[i].tweetImg,
                                    authorPage:result[i].authorPage
                                }
                            }
                        }
                        else {
                            console.log(err);
                        }
                    });
                }



                connection.release();
            });
            res.json({
                message:'success',
                data:''
            });
        }
    }
    else {
        res.json({
            message:'fail',
            data:''
        });
    }
});




/* GET home page. */
router.get('/', function(req, res, next) {


    res.render('index', {
        title: 'YifanPu',
        tweetsList:tweetsList,
        DBpediaList:DBpediaList,
        tweetsFrequency:tweetFrequency
    });

    if(tweetsList.length!=0){
        var sqlTemp=tweetsList;
        pool.getConnection(function (err,connection) {
            for(var i=0;i<sqlTemp.length;i++){
                var uft8tweetText=utf8.encode(sqlTemp[i].tweetText);
                var uft8userName=utf8.encode(sqlTemp[i].userName);
                var param=[sqlTemp[i].tweetID,sqlTemp[i].headProfileImg,uft8userName,sqlTemp[i].screen_name,sqlTemp[i].authorPage,sqlTemp[i].time,uft8tweetText,sqlTemp[i].originTweetURL,sqlTemp[i].tweetImg];
                connection.query(appSQL.addInfoFromTable,param,function (err,result) {
                    if(!err){
                        if(result.affectedRows!=0){
                            console.log('add success');
                        }
                        else {
                            console.log('add failure');
                        }
                    }
                });
            }
            connection.release();
        });
    }

    //clear cache
    tweetsList=[];
    DBpediaList='';
    tweetFrequency=[0,0,0,0,0,0,0];
});


function parseTwitterDate(tdate) {
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff<=604800){
        if (diff < 604800)
            return Math.round(diff / 86400);
    }
    return 7;
}



module.exports = router;
