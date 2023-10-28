//Calculates an age for a given birthday
function findAge(birthday){
  //Current Time
  let time = new Date();
  //getMonth() returns the month as 1 less than expected for some reason
  let currentMonth = time.getMonth() + 1;

  //Spliced specifics out of birthday
  let birthYear = birthday.slice(0,4);
  let birthMonth = birthday.slice(5,7);
  let dayOfBirth = birthday.slice(8,10);

  let age = time.getFullYear() - birthYear;

  if ((currentMonth < birthMonth) || ((currentMonth == birthMonth) && (time.getDate() < dayOfBirth))) {
    age--;
  }

  return age;
};

//Code to ensure all fields are properly filled out and colored accordingly
function checkFields(formComplete){
  if(document.getElementById("firstName").value === ""){
    $("#firstName").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#firstName").css("background-color", "#FFFFFF");
  }

  if(document.getElementById("lastName").value === ""){
    $("#lastName").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#lastName").css("background-color", "#FFFFFF");
  }

  if(document.getElementById("birthday").value === ""){
    $("#birthday").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#birthday").css("background-color", "#FFFFFF");
  }

  if(document.getElementById("address").value === ""){
    $("#address").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#address").css("background-color", "#FFFFFF");
  }

  if(document.getElementById("gpa").value === ""){
    $("#gpa").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#gpa").css("background-color", "#FFFFFF");
  }

  if((document.getElementById("male").checked === false) && (document.getElementById("female").checked === false) && (document.getElementById("nonbinary").checked === false)){
    $('input[name="gender"]').css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $('input[name="gender"]').css("background-color", "rgb(168, 166, 176)");
  }

  if(document.getElementById("email").value === ""){
    $("#email").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#email").css("background-color", "#FFFFFF");
  }

  if((document.getElementById("degree").value === "Select") || (document.getElementById("degree").value === "")){
    $("#degree").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#degree").css("background-color", "#FFFFFF");
  }

  if(document.getElementById("activities").value === ""){
    $("#activities").css("background-color", "#fc746f");
    formComplete = false;
  }
  else{
    $("#activities").css("background-color", "#FFFFFF");
  }

  return formComplete;
};


$(document).ready(function(){
  //Elements with the class reviewInfo don't need to be seen until
  //the info was submitted
  document.querySelectorAll('.reviewInfo').forEach(function(element) {
    element.style.visibility = 'hidden';
  });

  //Clears all fields
  $("#clear").click(function(){
    document.getElementById("firstName").value = null;
    document.getElementById("lastName").value = null;
    document.getElementById("birthday").value = null;
    document.getElementById("address").value = null;
    document.getElementById("gpa").value = null;
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    document.getElementById("nonbinary").checked = false;
    document.getElementById("degree").value = null;
    document.getElementById("activities").value = null;
    document.getElementById("email").value = null;
  });

  //Ensures all fields are filled out and prints application information to the page when everything is filled out
  $("#submit").click(function(){
    let formComplete = true;

    //Checks to see if all fields are filled out
    formComplete = checkFields(formComplete);

    //Only lets user continue if all fields are filled out
    if(formComplete === false){
      $("#errorMessage").text("");
      $("#errorMessage").append("Cannot submit application. Please fill out fields marked in red");

      document.querySelectorAll('.reviewInfo').forEach(function(element) {
        element.style.visibility = 'hidden';
      });
    }
    else{
      //Resets the colors of the potentially red fields
      $("#firstName").css("background-color", "#FFFFFF");
      $("#lastName").css("background-color", "#FFFFFF");
      $("#birthday").css("background-color", "#FFFFFF");
      $("#address").css("background-color", "#FFFFFF");
      $("#gpa").css("background-color", "#FFFFFF");
      $('input[name="gender"]').css("background-color", "rgb(168, 166, 176)");
      $("#email").css("background-color", "#FFFFFF");
      $("#degree").css("background-color", "#FFFFFF");
      $("#activities").css("background-color", "#FFFFFF");

      //Removes the error message if it did appear
      $("#errorMessage").text("");


      //Print application to page
      let age = findAge(document.getElementById("birthday").value);
      let application = document.getElementById("firstName").value + " " + document.getElementById("lastName").value + "<br>" +
                        document.getElementById("email").value + "<br>" +
                        "Age: " + age + "<br>" +
                        "Gender: " + $("input[name='gender']:checked").val() + "<br>" + 
                        "Address: " + document.getElementById("address").value + "<br>" +
                        "G.P.A.: " + document.getElementById("gpa").value + "<br>" + 
                        "Applying to be a " + document.getElementById("degree").value + " Major" + "<br>" + 
                        "Highschool activities: " + "<br>" + document.getElementById("activities").value;


      //Resets text every time you append the applicant info
      $("#applicantInfo").text("");

      $("#applicantInfo").append(application);

      //Makes all the personal information visible
      document.querySelectorAll('.reviewInfo').forEach(function(element) {
        element.style.visibility = 'visible';
      });
    }
  });

  //Opens modal to thank the user for applying, won't work if they don't promise the information is correct
  $("#submitApplication").click(function(){
    if(document.getElementById('liability').checked){
      document.getElementById('tyModal').style.display='block';
    }

    //If the correct date is entered the user gets to see a secret
    if(document.getElementById("birthday").value === "1990-02-11"){
      document.getElementById('gameButton').style.visibility = 'visible';
    }
    else{
      document.getElementById('gameButton').style.visibility = 'hidden';
    }
  });

  //Secret button that does cool things if visible
  $("#gameButton").click(function(){
    document.getElementById("gameButton").style.visibility = 'hidden';
    $("#gameHolder").append(
      '<iframe src="https://www.retrogames.cc/embed/18014-dragon-warrior-iv-usa.html" id="game" width="800" height="650" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>'
    );
  });

});