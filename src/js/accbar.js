//Copyright 2020 Humber College

//Permission is hereby granted, free of charge, to any person obtaining a copy of the code for the Accessibility Bar and associated documentation files (ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSoftwareÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ ) for use in the Google Chrome internet browser, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var accbarloaded = false;


//if (typeof jQuery != 'undefined') {  
    // jQuery is loaded => print the version
    //if (jQuery.fn.jquery < "1.11.2")
        //alert("error: your jquery verison is too low , please visit https://code.jquery.com/ to get the latest version");
//}
//else{
    //alert("error: Accbar could not detect JQuery, please visit https://code.jquery.com/ to get the latest version");
//}

$(document).ready(function(){
    if (accbarloaded)
        return;
    accbarloaded = true;
    var language = $("body").data("language");
    var readtags = ($("body").data("tags"));
    var altoff = ($("body").data("altoff"));
    if (readtags)
        readtags = readtags.toLowerCase();
    else
        readtags = "'p','span','a','h1','h2','h3','h4','h5','ul','li','ol','ul','td','th','blockquote','h6'";

    console.log(language);

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function enumDoms(output,root,igrontags){
        var children = $(root).children();
        if (children.length){
            for (var i = 0; i < children.length; i++){
                var tag = $(children[i])[0].nodeName.toLowerCase();
                if (tag == "nav")
                    console.log("asfd");
              //  console.log(tag+"----"+readtags);
                if (
                    (!igrontags && 
                        ((readtags && readtags.indexOf("'"+tag+"'") != -1) || 
                           
                            $(children[i]).hasClass("tts") || 
                            $(children[i]).hasClass("notts") || 
                            (!altoff&&tag == "img") || 
                            (tag == "button"))) ||
                    (igrontags && tag =="img" && igrontags == 1)){
              //      if (igrontags == 1 && tag =="img")
                //        console.log(tag+"-" + $(children[i]).attr("alt"));
                   // if (tag == "a")
                    //    console.log(tag+"-" + $(children[i]).text());
                    if (!$(children[i]).hasClass("notts")){
                        output.push($(children[i]));
                        enumDoms(output,children[i],1);
                    }
                    else{
                        console.log("asdfsf");
                        enumDoms(output,children[i],2);
                    }
                    
                 //   if (!$(children[i]).hasClass("tts"))
                 //       console.log(tag);
                }
                else{
                    enumDoms(output,children[i],igrontags);
                }
            }
        }
        else{
           // console.log($(root).text());
        }
    }
    

    function initTts(){
        this.ttssupport= false;
        var synthObj = window.speechSynthesis;
        if ('speechSynthesis' in window) {
            ttssupport= true;
        } else {
            ttssupport= false;
        }
        this.isreading = false;
        this.ispause = false;
        var timerhandle = null;

       
        this.ttsclick = (function(){
            if (!isreading)
                this.playstop();
            else
                this.pause();
        });

        this.ttsstop = (function(){
            playstop();
        })

        function loadVoices() {
          // Fetch the available voices.
            var voices = speechSynthesis.getVoices();
          
          // Loop through each of the voices.
            voices.forEach(function(voice, i) {
            // Create a new option element.
                
            });
            if (ttssupport){
                window.speechSynthesis.cancel();
            }
        }

        // Execute loadVoices.
        if (ttssupport)
            loadVoices();

        // Create a new utterance for the specified text and add it to
        // the queue.
        this.speak = function (text) {
            var msg = new SpeechSynthesisUtterance();
            var defvoice = "Alex";
            msg.text = text;
          
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
          
            //if (voiceSelect.value) {
            if ($("body").data("voice"))
                defvoice = $("body").data("voice");
    //msg.voice = speechSynthesis.getVoices();

            if (!language){
                if (window.navigator.userAgent.indexOf("Edge") == -1)
                {
                    alex = speechSynthesis.getVoices().filter(function(voice) {
                     return voice.name =="Alex"; });
                    if (alex.length)
                        msg.voice = alex[0];
                    else{

                        eng = speechSynthesis.getVoices().filter(function(voice) {
                         return voice.lang =="en-US"; });
                        if (eng.length)
                            msg.voice = eng[0];
                        else
                            msg.voice = speechSynthesis.getVoices().filter(function(voice) { return true; })[0];
                    }
             //       if (!msg.voice)
               //         msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google US English" })[0];
                }
            }
            else if(language == "fr"){
                 speechSynthesis.getVoices().filter(
                    function(voice) { 
                        if (voice.lang == "fr-FR")
                            msg.voice = voice;
                    });
                if (!msg.voice){
                    alert("no french lib found");
                }
            }
            else if(language == "es"){
                 speechSynthesis.getVoices().filter(
                    function(voice) { 
                        if (voice.lang == "es-ES")
                            msg.voice = voice;
                    });
                if (!msg.voice){
                    alert("no french lib found");
                }
            }
            else if(language == "cn"){
                 speechSynthesis.getVoices().filter(
                    function(voice) { 
                        if (voice.lang == "zh-CN")
                            msg.voice = voice;
                    });
                if (!msg.voice){
                    alert("no french lib found");
                }
            }
               
            speechSynthesis.getVoices().forEach(function(voice){
           //     console.log(voice);
            })
            //}

            window.speechSynthesis.speak(msg);

           
        }

        function finishReading(){

        }

        function selectText( dom ) {
            var node = dom[0];
            node.scrollIntoView( true );
            if ( document.selection ) {
                var range = document.body.createTextRange();
                range.moveToElementText( node  );
                range.select();
            } else if ( window.getSelection ) {
                var range = document.createRange();
                range.selectNodeContents( node );
                window.getSelection().removeAllRanges();
                window.getSelection().addRange( range );
            }
        }

        var multicontent;
        var multicontentindex = 0;
        var contentindex = 0;
        var contentstatus = {};
        this.playstop = function(){
            $('.panel-collapse').each(function(){
                if (!$(this).hasClass('in') && !$(this).hasClass('fold')) {
                    $(this).collapse('toggle');
                }
            });

            if (ttssupport){
                if (!isreading)
                {
                    window.speechSynthesis.cancel();
                    $(".magnifier_wrapper .tts").removeClass("tts");
                    var ttscontents = [];

                    enumDoms(ttscontents,$("body"));

                    contentindex = 0;
                    isreading = true;
                    ispause = false;
                    $(".accpanel").addClass("tts-status-playing");
                    $(".accpanel").removeClass("tts-status-pause");

                    timerhandle = setInterval(function(){

                        if ((ttscontents.length > contentindex || multicontent.length > multicontentindex)
                            && !window.speechSynthesis.speaking && !ispause){
                            if (!multicontent || multicontent.length <= (multicontentindex)){
                                $("img").removeClass("ttshighlight");
                                var contenttext;
                                var maxwords = 30;
                                var domitem = $(ttscontents[contentindex]);
                                if (domitem.attr("alt")){
                                   domitem.addClass("ttshighlight");
                                    contenttext = "image, " + (domitem.attr("alt"));
                                }
                                else if (domitem[0].nodeName.toLowerCase() == "button"){
                                   contenttext = "";
                                    if (domitem.text())
                                        contenttext = "button, " + (domitem.text());
                                }
                                else if (domitem[0].nodeName.toLowerCase() == "a"){
                                    contenttext = "";
                                    if (domitem.text())
                                        contenttext = "link, " + (domitem.text());
                                }
                                else{
                                    contenttext = (domitem.text());
                                }
                                contenttext = contenttext.split(" ");
                                selectText(domitem);
                                domitem.scrollTop();
                                contentindex++;
                                multicontentindex = 0;
                                multicontent = [];
                                var isfound = false;
                                for (var a=0; a < contenttext.length; a++){
                                    if (!multicontent[parseInt(a/maxwords)])
                                        multicontent[parseInt(a/maxwords)] = "";
                                    if(contenttext[a])
                                        isfound = true;
                                    multicontent[parseInt(a/maxwords)] += " " + contenttext[a];
                                }

                                contentstatus[contentindex] = isfound;
                            }
                            speak(multicontent[multicontentindex]);
                            multicontentindex++;

                        }
                        else if(ttscontents.length == contentindex &&  !window.speechSynthesis.speaking){
                            $("img").removeClass("ttshighlight");
                            playstop()
                        }
                    },100);
                }
                else{
                    isreading = false;
                    clearInterval(timerhandle);
                    window.speechSynthesis.cancel();
                    $(".accpanel").removeClass("tts-status-playing");
                }
            }
            else{
                alert("your browser doesnot support TTS");
            }
        }

        this.pause = function() {
            if (!isreading || !ttssupport)
                return;
            if (!ispause){
                ispause = true;
                window.speechSynthesis.pause();
                $(".tts-play").prop("title","Click on this icon to play");
                $(".accpanel").addClass("tts-status-pause");
            }
            else{
                $(".tts-play").prop("title","Click on this icon to pause playback");
                window.speechSynthesis.resume();
                ispause = false;
                $(".accpanel").removeClass("tts-status-pause");
            }
        }

        this.skip = function(){
            if (!isreading || !ttssupport)
                return;
            window.speechSynthesis.cancel();
            multicontent= null;
           // contentindex++;
        }

        this.back = function(){
            if (!isreading || !ttssupport)
                return;

            var i = 0;
            do{
                contentindex--;
                if(contentstatus[contentindex])
                    i++;
            }while(contentindex >= 0 && i < 2)


            if(contentindex < 0)
                contentindex = 0;
            window.speechSynthesis.cancel();
            multicontent= null;
            
        }

        
        return this;
    }

    function initMagnifier(){
       
        var zoom = $("<div class=\"magnifier_content\"><div class=\"magnifier_body\" id=\"magnifier_body\" ><div class=\"magnifier_wrapper \"></div></div></div>");
        var zoomstatus = false;
        var lastscrolltop = 0;
        //zoom.find(".magnifier_wrapper").append($($("body").html()));
        document.body.appendChild(zoom[0]);

        this.quit = function(){
           
            zoom.hide();
            zoomstatus = false;
            $(".magnifier").removeClass("activated");

        }

        function exec(e){
            if (zoomstatus)
                return;
            zoom.remove();
            zoom = $("<div class=\"magnifier_content\"><div class=\"magnifier_body\" id=\"magnifier_body\" ><div class=\"magnifier_wrapper \"></div></div></div>");
            var aaa=$("body").html();
            aaa =$(aaa);
            zoom.find(".magnifier_wrapper").append($($("body").html()));
            document.body.appendChild(zoom[0]);
            lastscrolltop = $(window).scrollTop();
            zoomstatus = true;
            zoom.show();
            $(".magnifier").addClass("activated");
        }

        $(document).on("mousemove", function(e){
            if (zoomstatus){
                if ($(window).scrollTop()+e.clientY > $("body").height())
                    e.clientY = $("body").height() - $(window).scrollTop();

                zoom.css({left:e.clientX - 225, top:$(window).scrollTop()+e.clientY - 225});
                zoom.find(".magnifier_wrapper").css({"left":0-(e.clientX) * 2 + 225, "top":0-($(window).scrollTop()+e.clientY ) * 2 + 225,width:$("body").width(),height:$("body").height()});
                
                if (lastscrolltop){
                    $(window).scrollTop(lastscrolltop);
                    lastscrolltop = 0;
                }
            }
        }); 
        this.reset = function(e){
            if (zoomstatus){
                zoom.remove();
                zoom = $("<div class=\"magnifier_content\"><div class=\"magnifier_body\" id=\"magnifier_body\" ><div class=\"magnifier_wrapper \"></div></div></div>");
                zoom.find(".magnifier_wrapper").append($($("body").html()));
                document.body.appendChild(zoom[0]);
                zoomstatus = false;
                exec();
                if ($(window).scrollTop()+e.clientY > $("body").height())
                    e.clientY = $("body").height() - $(window).scrollTop();
 
                zoom.css({left:e.clientX - 225, top:$(window).scrollTop()+e.clientY - 225});
                zoom.find(".magnifier_wrapper").css({"left":0-(e.clientX) * 2 + 225, "top":0-($(window).scrollTop()+e.clientY ) * 2 + 225,width:$("body").width(),height:$("body").height()});
                
                if (lastscrolltop){
                    $(window).scrollTop(lastscrolltop);
                    lastscrolltop = 0;
                }
            }
        }
        this.butclick = function(e){
            
            
                if (!zoomstatus){
                    exec();
                }
                else if (zoomstatus){
                    this.quit();
                }
            
        }
        
        return this;
    }

    if (isMobile.any()){
        $(".accpanel").hide();
        return;
    }

    var button = $("<div class=\"accpanel\" >"
                +"<a  class=\"button accbar tts-play\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Click on this icon to convert the text on this page to an audio version. If using your keyboard, press 1 to start and stop the reader, press 2 to pause the reader.\">"
                +"<a  class=\"button accbar tts-stop\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Click on this icon to stop reading.\"></a>"
                +"<a  class=\"button accbar magnifier\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Click on this icon to enable the magnifying glass. Move your mouse over the content you would like to enlarge.\"></a>"
                +"<a  class=\"button accbar pdf\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Click on the PDF button to open the PDF document in a new window. From this new window, the document can be downloaded.\"></a>"
                +"<a  class=\"button accbar print\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Click on this icon to print this page.\"></a>"
                +"<a  class=\"button accbar rtf\" data-toggle=\"tooltip\" data-placement=\"bottom\"  title=\"Rtf files are for screen reader users. Click this icon to download the rtf file for this content.\"></a>"
            +"</div>")
    
  //  $('[data-toggle="tooltip"]').tooltip();

    var  framework = $(window.parent.document.getElementById("cleanSlate"));
    if (framework.length === 0){
        framework = $(window.parent.document.getElementsByClassName("d2l-iframe"));
        console.log(framework);
    }
    if(framework.length){
        $( window.parent ).scroll(function() {
            if ($( window.parent ).scrollTop() > 270){
                button.css("top",(0+$( window.parent ).scrollTop() - 220) > 100 ? (0+$( window.parent ).scrollTop() - 220) : 100);
            }
            else
                button.css("top",100);
        });
    }
    else{
        button.find(".pdf").remove();
        button.find(".rtf").remove();
    }


    
    var magnifier = initMagnifier();
    var tts = initTts();


    $(document).click(function(event) {
        if (event.target.className.indexOf("accbar") !== -1){
            if (event.target.className.indexOf("magnifier") !== -1){
                magnifier.butclick(event);
            }
            else if (event.target.className.indexOf("print") !== -1){
                event.preventDefault();
                window.print();
                $(event).blur();
            }
            else if (event.target.className.indexOf("rtf") !== -1){
                event.preventDefault();
                window.location.href = $("body").data("rtf");
                $(event).blur();
            }
            else if (event.target.className.indexOf("pdf") !== -1){
                event.preventDefault();
                  window.open(
                      $("body").data("pdf"),
                      '_blank' // <- This is what makes it open in a new window.
                    );
                $(event).blur();
            }
            else if (event.target.className.indexOf("tts-play") !== -1){
                tts.ttsclick();
            }
            else if (event.target.className.indexOf("tts-stop") !== -1){
                tts.ttsstop();
            }
        }
        else
            magnifier.reset(event);
    });

    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function doSomethingWithSelectedText() {
        //setTimeout(function(){
            var selectedText = getSelectedText();
            if (selectedText && ttssupport) {
                if (tts.isreading){
                    if (!tts.ispause)
                        tts.pause();
                    window.speechSynthesis.cancel();
                    setTimeout(function(){
                        tts.speak(selectedText);
                        
                    },500);
                }
            }//},100);
    }

    document.onmouseup = doSomethingWithSelectedText;


    $(document).keyup(function (event) {
        if (event.keyCode === 49){
            tts.playstop();
        }
        else if(event.keyCode == 50){
            tts.pause();
            
        }
        else if(event.keyCode == 27){
            magnifier.quit();
            
        }
        else if(event.keyCode == 38){
            tts.back();
            
        }
        else if(event.keyCode == 40){
            tts.skip();
            
        }
        console.log(event.keyCode);
        /*else if(event.keyCode == 27){
            isreading = false;
            clearInterval(timerhandle);
            window.speechSynthesis.cancel();
        }*/

    });


    document.body.appendChild(button[0]);
});

