jsonStudentList = "";

$(function(){

    console.log("engine loaded");

    getAllStudents();


    //AJOUTER ETUDIANT
    $("#addStudent").on("click", function(){
        var studentlist = $("#studentlist");    
        var studentinput = $("#studentinput");    

        $.ajax({
            type: "POST",
            url: "api/LNService/CreateStudent/",
            data: studentinput.val(),
            contentType: "application/json",
            processData : false
        })
        .done(function( msg ) {
            console.log( "Return : " + msg );
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
        studentinput.val("");
        getAllStudents();
    });

    //RECUPERER LISTE ETUDIANTS

    function getAllStudents(){
        $("#studentlist").html("");
        $.ajax({
            type: "GET",
            url: "api/LNService/GetAllStudents/",
            data: "",
            contentType: "application/json",
            processData : false
        })
        .done(function( msg ) {
            console.log(jQuery.parseJSON(msg));
            jsonStudentList = JSON.parse(msg);
            $("#studentlist").html("");
            var nameArray = new Array();
            for (var i=0; i < jsonStudentList.length; i++){
                nameArray[i] = jsonStudentList[i].name;
            }
            nameArray.sort();
            for (var i=0; i < jsonStudentList.length; i++){
                $("#studentlist").append('<li><a href="#notes" data-rel="external" class="ui-btn">'+nameArray[i]+'</a></li>');
                $("#studentlist").listview("refresh");
            }

        })
        .fail(function( jqXHR, textStatus ) {
            console.log( "Request failed: " + textStatus );
        });   
    }

    //BLABAL

    var listIndex = 0;
    //DIALOG MANADGER
    $('#studentlist').on("click", "li", function(){ // s'applique sur les a de studentlist et evite un bug
        console.log("clic on "+$(this).text()+" index "+$(this).index());
        $("#namelabel").text($(this).text()); //#document.location.hash
        localStorage.setItem("currentuser", $(this).text());
        $("#noteslist").html("");

        //GET NOTES
        $.ajax({
            type: "GET",
            url: "api/LNService/GetAllNotes/"+$(this).text(),
            data: "",
            contentType: "application/json",
            processData : false
        })
        .done(function( msg ) {
            console.log(jQuery.parseJSON(msg));
            jsonNotesList = JSON.parse(msg);
            for (var i=0; i < jsonStudentList.length; i++){
                $("#noteslist").append('<li data-icon="info">'+jsonNotesList[i].Matiere+'<span class="ui-li-count">'+jsonNotesList[i].note+'</span></li>');
                $("#noteslist").listview("refresh");
            }

        })
        .fail(function( jqXHR, textStatus ) {
            console.log( "Request failed: " + textStatus );
        });   
    });

    $('#addNote').on("click", function(){
        console.log("add note clicked");
        console.log("request : api/LNService/CreateNote/"+$("#namelabel").text()+" Data : "+'{"Note":'+$("#noteinput").val()+',"Matiere":"'+$("#noterange").val()+'"}');
        $.ajax({
            type: "POST",
            url: "api/LNService/CreateNote/"+$("#namelabel").text(),
            data: '{"Note":'+$("#noterange").val()+',"Matiere":"'+$("#noteinput").val()+'"}',
            contentType: "application/json",
            processData : false
        })
        .done(function( msg ) {
            console.log( "Return : " + msg );
            re
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });
});      

$('#dialogUpdate').on("click", function(){
    studentArray[listIndex] = $("#dialoginput").val();
    localStorage.setObj("studentArray", studentArray);
    console.log($("#dialoginput").val()+" added");
    getAllStudents();
    history.back();
});

$('#dialogDelete').on("click", function(){
    studentArray.splice(listIndex, 1); //remove at index

    localStorage.setObj("studentArray", studentArray);
    console.log($("#dialoginput").val()+" deleted");
    getAllStudents();
    history.back();
});
