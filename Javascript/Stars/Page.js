function setTab(id)
{
    var tp = $("#TP" + id);
    if (tp.is(":visible") == false)
    {
        $("#LI" + id).removeClass("tc_Li").addClass("tc_Li_Atd");
        $("#LI" + id + "P0").removeClass("tc_Span1").addClass("tc_Span1_Atd");
        $("#LI" + id + "L0").removeClass("tc_Label").addClass("tc_Label_Atd");
        $("#LI" + id + "P1").removeClass("tc_Span2").addClass("tc_Span2_Atd");

        var cur = $("#Tab").attr("va");

        $("#LI" + cur).removeClass("tc_Li_Atd").addClass("tc_Li");
        $("#LI" + cur + "P0").removeClass("tc_Span1_Atd").addClass("tc_Span1");
        $("#LI" + cur + "L0").removeClass("tc_Label_Atd").addClass("tc_Label");
        $("#LI" + cur + "P1").removeClass("tc_Span2_Atd").addClass("tc_Span2");

        $("#Tab").attr("va", id);
        $("#TP" + cur).hide();
        tp.show();
        switch (id)
        {
            case 1:
                if ($("#TP1").attr("ac") == "0")
                {
                    $("#MovieInfoDiv").jscroll({ W: "6px", Btn: { btn: false} });
                    $("#TP1").attr("ac", "1");
                }
                break;
            case 2:
                if ($("#TP2").attr("ac") == "0")
                {
                    $("#AdInfoDiv").jscroll({ W: "6px", Btn: { btn: false} });
                    $("#TP2").attr("ac", "1");
                }
                break;
            case 3:
                if ($("#TP3").attr("ac") == "0")
                {
                    $("#MusicInfoDiv").jscroll({ W: "6px", Btn: { btn: false} });
                    $("#TP3").attr("ac", "1");
                }
                break;
            case 4:
                if ($("#TP4").attr("ac") == "0")
                {
                    $("#PhotosInfoDiv").jscroll({ W: "6px", Btn: { btn: false} });
                    $("#TP4").attr("ac", "1");
                }
                break;
        }
    }
}
function displayAbs(id)
{
    if (id != "" && id != null)
    {
        $.ajax({
            type: "POST",
            url: "VisitAbsProcess.aspx",
            data: "ID=" + id,
            error: function () { },
            success: function (data) { }
        });
    }
}
function displayVdo(id)
{
    $f().stop();
    $.ajax({
        type: "POST",
        url: "../Video/GetInfo.aspx",
        data: "ID=" + id,
        error: function () { },
        success: function (data) { resetVideo(data, id); }
    });
    setVisit(id);
}
function resetVideo(info, vid)
{
    if (info == "" || info == null || info == undefined)
    {
    }
    else
    {
        var data = info.split("%HbsbH%");
        $("#idBoxTitle").html(data[3]);
        $("#Player").attr("href", data[4]);
    }
    $f("Player", "../Javascript/Flv/flowplayer.swf", {
        clip: {
            autoPlay: false,
            autoBuffering: true
        }
    });
//    $f("Player", "../Javascript/Flv/flowplayer.commercial.swf", {
//        clip: {
//            autoPlay: false,
//            autoBuffering: true
//        },
//        plugins: {
//            controls: {
//                url: 'flowplayer.controls-3.2.2.swf'
//            }
//        }
//    });
    openVideo();
}
function openVideo()
{
    box.Show();
    $f().play();
}
function setVisit(id)
{
    $.ajax({
        type: "POST",
        url: "../Video/VisitProcess.aspx",
        data: "ID=" + id,
        error: function () { },
        success: function (data) { }
    });
}
//function displayPic(id)
//{
//    if (id != "" && id != null)
//    {
//        $.ajax({
//            type: "POST",
//            url: "VisitPicProcess.aspx",
//            data: "ID=" + id,
//            error: function () { },
//            success: function (data) { }
//        });
//    }
//}
function forward(id)
{
    if ($("#CTDiv" + id).attr("act") == "0")
    {
        var cur = Number($("#CTDiv" + id).attr("cur"));
        var max = Number($("#CTDiv" + id).attr("max"));

        if (cur > 1)
        {
            $("#CTDiv" + id).attr("act", "1");
            $("#CTDiv" + id).animate({ scrollLeft: disWD * 3 * (cur - 2) }, 500, "linear", function () { $("#CTDiv" + id).attr("cur", cur - 1); $("#CTDiv" + id).attr("act", "0"); $("#BK" + id).show(); if (cur == 2) { $("#FW" + id).hide(); } });
        }
    }
}
function back(id)
{
    if ($("#CTDiv" + id).attr("act") == "0")
    {
        var cur = Number($("#CTDiv" + id).attr("cur"));
        var max = Number($("#CTDiv" + id).attr("max"));

        if (cur < max)
        {
            $("#CTDiv" + id).attr("act", "1");
            $("#CTDiv" + id).animate({ scrollLeft: disWD * 3 * cur }, 500, "linear", function () { $("#CTDiv" + id).attr("cur", cur + 1); $("#CTDiv" + id).attr("act", "0"); $("#FW" + id).show(); if (cur + 1 == max) { $("#BK" + id).hide(); } });
        }
    }

//    $("#CTDiv" + id).scrollLeft(300); 
}
function closeBox()
{
    $f().stop();
    box.Close();
}
function init()
{
    $("#PersonInfoDiv").jscroll({ W: "6px", Btn: { btn: false} });
    $(".spanHover,.tc_Label,.tc_Label_Atd").hover(
    function () { $(this).css("text-decoration", "underline").css("cursor", "pointer"); },
    function () { $(this).css("text-decoration", "none").css("cursor", "default"); });

    $(".absLink").colorbox({ transition: "fade", maxWidth: "1000px", maxHeight: "750px", overlayClose: false });
//    $(".picLink").colorbox({ transition: "fade", width: "800px", height: "600px", overlayClose: false });
    var sid = $("#STID").val();
    disWD = Number($("#DVWD").val())
    if (sid != "" && sid != null)
    {
        $.ajax({
            type: "POST",
            url: "VisitProcess.aspx",
            data: "ID=" + sid,
            error: function () { },
            success: function (data) { }
        });
    }
    $f("Player", "../Javascript/Flv/flowplayer.swf", {
        clip: {
            autoPlay: false,
            autoBuffering: true
        }
    });
//    $f("Player", "../Javascript/Flv/flowplayer.commercial.swf", {
//        clip: {
//            autoPlay: false,
//            autoBuffering: true
//        },
//        plugins: {
//            controls: {
//                url: 'flowplayer.controls-3.2.2.swf'
//            }
//        }
//    });
    box = new LightBox("idBox");
}
var disWD = 0;
var box = null;
$(function () { init(); });