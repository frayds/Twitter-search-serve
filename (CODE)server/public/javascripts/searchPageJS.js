/**
 * Created by frayd on 17/3/23.
 */
// /*<!--*/
// /**----------Dragon be here!----------/*/
// /**      ┏┓     ┏┓*/
// /** 　　┏┛┻━━━━━┛┻┓*/
// /** 　　┃         ┃*/
// /** 　　┃    ━    ┃*/
// /** 　　┃　┳┛　┗┳　┃*/
// /** 　　┃         ┃*/
// /** 　　┃    ┻    ┃*/
// /** 　　┃         ┃*/
// /** 　　┗━┓　　　┏━┛*/
// /** 　　  ┃　　　┃神兽保佑*/
// /** 　　  ┃　　　┃代码无BUG！*/
// /** 　　  ┃　　　┗━━━┓*/
// /** 　　  ┃         ┣┓*/
// /** 　　  ┃         ┏┛*/
// /** 　　  ┗┓┓┏━━┳┓ ┏┛*/
// /** 　　   ┃┫┫   ┃┫┫*/
// /** 　     ┗┻┛　 ┗┻┛ 　　*/
// /** ━━━━━━神兽出没━━━━━━*/
// /*-->*/

var shine = new Shine(document.getElementById('jumbotronPageHeaderH1'));

var config = new shinejs.Config({
    numSteps: 8,
    opacity: 0.8,
    shadowRGB: new shinejs.Color(237, 145, 33)
});

function handleMouseMove(event) {
    shine.light.position.x = event.clientX;
    shine.light.position.y = event.clientY;
    shine.config=config;
    shine.draw();
}

window.addEventListener('mousemove', handleMouseMove, false);

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
$(function () {
    $('#dropdownMenu1 a').click(function () {
       var temp=$(this).text();
       $('#searchButton1').val(temp);
    });
    $('#dropdownMenu2 a').click(function () {
        var temp=$(this).text();
        $('#searchButton2').val(temp);
    });
    $('#dropdownMenu3 a').click(function () {
        var temp=$(this).text();
        $('#searchButton3').val(temp);
    });
    $('#dropdownMenu4 a').click(function () {
        var temp=$(this).text();
        $('#searchButton4').val(temp);
    });
    $('#dropdownMenu5 a').click(function () {
        var temp=$(this).text();
        $('#searchButton5').val(temp);
    });
    $('#dropdownMenu6 a').click(function () {
        var temp=$(this).text();
        $('#searchButton6').val(temp);
    });

//    ---------------------------------------

    $('#anchor').click(function () {
        var oPos=$('.searchPart').offset().top;
        console.log(oPos);
        return window.scrollTo(0,oPos-36);
    });

    $('#searchButton').click(function () {
        //players search box
        var players='';
        //NO.1 search box=================================
        if($('#firstLevelSearchContent1').val()!=''){
            if($('#searchButton1').val()=='Name'){
                players+=$('#firstLevelSearchContent1').val();
            }
            else if($('#searchButton1').val()=='#'){
                players+='#'+$('#firstLevelSearchContent1').val();
            }
            else {
                players+='@'+$('#firstLevelSearchContent1').val();
            }
        }
        //NO.2 search box=================================
        if($('#firstLevelSearchContent2').val()!=''){
            if($('#searchButton2').val()=='Name'){
                if(players==''){
                    players+=$('#firstLevelSearchContent2').val();
                }
                else {
                    players+=' OR '+$('#firstLevelSearchContent2').val();
                }

            }
            else if($('#searchButton2').val()=='#'){
                if(players==''){
                    players+='#'+$('#firstLevelSearchContent2').val();
                }
                else{
                    players+=' OR '+'#'+$('#firstLevelSearchContent2').val();
                }
            }
            else {
                if(players==''){
                    players+='@'+$('#firstLevelSearchContent2').val();
                }
                else {
                    players+=' OR '+'@'+$('#firstLevelSearchContent2').val();
                }

            }
        }
        //NO.3 search box=================================
        if($('#firstLevelSearchContent3').val()!=''){
            if($('#searchButton3').val()=='Name'){
                if(players==''){
                    players+=$('#firstLevelSearchContent3').val();
                }
                else {
                    players+=' OR '+$('#firstLevelSearchContent3').val();
                }
            }
            else if($('#searchButton3').val()=='#'){
                if(players==''){
                    players+='#'+$('#firstLevelSearchContent3').val();
                }
                else {
                    players+=' OR '+'#'+$('#firstLevelSearchContent3').val();
                }
            }
            else {
                if(players==''){
                    players+='@'+$('#firstLevelSearchContent3').val();
                }
                else {
                    players+=' OR '+'@'+$('#firstLevelSearchContent3').val();
                }
            }
        }
        //Football Teams search box
        var footBallTeams='';
        //NO.1 search box=================================
        if($('#secondLevelSearchContent1').val()!=''){
            if($('#searchButton4').val()=='Name'){
                footBallTeams+=$('#secondLevelSearchContent1').val();
            }
            else if($('#searchButton4').val()=='#'){
                footBallTeams+='#'+$('#secondLevelSearchContent1').val();
            }
            else {
                footBallTeams+='@'+$('#secondLevelSearchContent1').val();
            }
        }
        //NO.2 search box=================================
        if($('#secondLevelSearchContent2').val()!=''){
            if($('#searchButton5').val()=='Name'){
                if(footBallTeams==''){
                    footBallTeams+=$('#secondLevelSearchContent2').val();
                }
                else {
                    footBallTeams+=' OR '+$('#secondLevelSearchContent2').val();
                }

            }
            else if($('#searchButton5').val()=='#'){
                if(footBallTeams==''){
                    footBallTeams+='#'+$('#secondLevelSearchContent2').val();
                }
                else{
                    footBallTeams+=' OR '+'#'+$('#secondLevelSearchContent2').val();
                }
            }
            else {
                if(footBallTeams==''){
                    footBallTeams+='@'+$('#secondLevelSearchContent2').val();
                }
                else {
                    footBallTeams+=' OR '+'@'+$('#secondLevelSearchContent2').val();
                }

            }
        }
        //NO.3 search box=================================
        if($('#secondLevelSearchContent3').val()!=''){
            if($('#searchButton6').val()=='Name'){
                if(players==''){
                    footBallTeams+=$('#secondLevelSearchContent3').val();
                }
                else {
                    footBallTeams+=' OR '+$('#secondLevelSearchContent3').val();
                }
            }
            else if($('#searchButton6').val()=='#'){
                if(players==''){
                    footBallTeams+='#'+$('#secondLevelSearchContent3').val();
                }
                else {
                    footBallTeams+=' OR '+'#'+$('#secondLevelSearchContent3').val();
                }
            }
            else {
                if(footBallTeams==''){
                    footBallTeams+='@'+$('#secondLevelSearchContent3').val();
                }
                else {
                    footBallTeams+=' OR '+'@'+$('#secondLevelSearchContent3').val();
                }
            }
        }


        //author of tweets search box
        var authorOfTweetsContent=$('#ThirdLevelSearchContent7').val();

        //checkBox:only search database
        var queryDatabaseOnlyFlag=$('#queryDatabaseOnly').is(':checked');



        var ajPost=$.ajax({
            url:'/search',
            type:'post',
            data:{
                players:players,
                footBallTeams:footBallTeams,
                authorOfTweets:authorOfTweetsContent,
                queryDatabaseOnly:queryDatabaseOnlyFlag
            },
            dataType:"json",
            success:function(data){
                var res = data;
                if(res.message == 'success')
                {
                    alert('success');
                    setTimeout( function(){
                       location.reload();
                    }, 700 );
                }
                if (res.message=='fail'){
                    alert('please input searching information');
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('fail');
            }
        });

    });
//    -----------------------------frequency chart handle

    var ctx=$('#tweetsChart');
    var date=$('#tweetsChart').attr("date").split(',');//frequency data

    //chart information structure
    var tweetsFrequency=new Chart(ctx,{
        type:'line',
        data:{
            labels : ["today","one day ago","two days ago","three days ago","four days ago","five days ago","six days ago"],
            datasets:[{
                label: 'frequency',
                data:date,
                fill: false,
                lineTension: 0.03,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false
            }]
        }
    });



});