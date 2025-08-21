$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "You're my everything",
        desc: "Dilihat dari bulan lalu sangat sulit untuk kita ya sayang? Can we build our sweet relationship back? Can we try again together sayang? I'm sorry, aku minta maaf, semuanya salah aku sayang. Please jangan lagi bilang kalo kamu yang bermasalah maupun kamu jahat, aku yang jahat sayang dan aku yang bermasalah. Aku ga pernah tau cara yang benar dalam memahami dan mendengarkanmu seperti yang pantas kamu dapatkan. Aku terus nyakitin perasaanmu hanya karena aku merasa cemburu dan overthinking sampai kamu cape sama aku. I know i made you feel like you were hard to love but the truth is it was me bby who failed to love you properly."
    }, {
        title: "I love you",
        desc: "I hate myself for that sayang, i really hate myself so much because i made you sad and crying because our arguments. Aku ga bisa tidur dengan baik karena tiap malem aku ngerasa hampa ga ada kamu, aku kangen kamu yang manja manja ke aku, semuanya tentang kamu aku kangen. Tanpa kamu everything feels heavy, kaya aku kehilangan segalanya."
    }, {
       title: "Please don't be in love with someone else?",
       desc: "Pas kamu bilang ke aku that i deserve someone better, it breaks my heart even more bby. Apa kamu ga liat? Kenapa aku harus mencari orang lain kalo yang aku inginkan tuh dirimu? Please don't replace me with another man sayang. It hurts so much even thinking about it. Aku mau jadi orang yang mengusap air matamu, memegang tanganmu melalui setiap masalah, yang selalu ada disaat duniamu ga baik-baik aja. Aku ingin menjadi orang yang kamu cari saat kamu sedang dalam keadaan terburuk dan menjadi orang yang merayakan bersamamu saat kamu sedang dalam keadaan terbaik."
    }, {
        title: "My one and only",
        desc: "Sayang, you're the only one for me, the only one i want to love forever. As long as i'm with you i'm better and happy. You're worth every single fight and i'm never giving up on us. Please think about it sayang, comeback to me. I will always wait for you no matter how long it is. I'll always wait sayang. My heart will still be here, waiting for the day you come back to me. Because no matter what happens, i still want you, i still choose you, and i will always love you with everything i have."
    }, {
        title: "I'll always be here",
        desc: "I'll always be here for you, for us. Whatever happens, please remember my heart will always be yours sayang. Aku ga akan berhenti peduli sama kamu, ga pernah berhenti untuk menginginkan yang terbaik buat kamu. Aku tau aku udah membuat kesalahan besar. Perasaanku ke kamu ga akan pernah berubah sayang, kamu segalanya buat aku, kamu sumber kebahagiaan aku, my light. I will keep waiting with an open heart. I love you so much bby more than you ever know."
 }];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});
