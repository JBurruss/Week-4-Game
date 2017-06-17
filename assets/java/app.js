$(document).ready(function() {
    var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds; //Set Global Variables
    var wins = 0;
    var loses = 0;

//Variables
    function varSet() { 
        myChar;
        opponentChar;

        choices = [];
        enemyArray = [{
                id: 0,
                name: "Seargent Angel",
                pic: 'assets/images/angel.jpg',
                hitPoints: 150,
                attackPower: 10
            }, {
                id: 1,
                name: "Constiple Butterman",
                pic: 'assets/images/danny.jpg',
                hitPoints: 100,
                attackPower: 25
            }, {
                id: 2,
                name: "Chief Inspector Butterman",
                pic: 'assets/images/frank.jpg',
                hitPoints: 120,
                attackPower: 19
            }, {
                id: 3,
                name: "Simon Skinner",
                pic: 'assets/images/simon.jpg',
                hitPoints: 140,
                attackPower: 9
            }, {
                id: 4,
                name: "Saxon",
                pic: 'assets/images/saxon.jpg',
                hitPoints: 90,
                attackPower: 20
            }, {
                id: 5,
                name: "Michael Armstrong",
                pic: 'assets/images/yarp.jpg',
                hitPoints: 170,
                attackPower: 7
            }


        ];

        haveCharacter = false;
        haveAttacker = false;
        numEnemies = 5;
        rounds = 7;

        for (var i = 0; i < enemyArray.length; i++) {
            choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
                "><img class='heroes' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].hitPoints +
                "<br> AP: " + enemyArray[i].attackPower + " </div>";
        }

        $("#picking").html(choices);
        $("#todo").html("Click to choose your Hero!");

        $('.hero').remove();
        $('.fighting').remove();
        $('#whathappens').html("");

        attachCharacterOnClick();
    }

    function printCharacters() {
        var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
            "><img class='heroes' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].hitPoints +
            "<br> AP: " + enemyArray[myChar].attackPower + " </div>";
        var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
            "><img class='heroes' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].hitPoints +
            "<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
        $('#myguy').html(hero);
        $('#enemy').html(badguy);
    }

    function whatHappens() {
        var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
            enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>" +
            "Your attack power has increased by " + rounds + "!";
        $('#whathappens').html(description);
    }
    //Picking your character
    function attachCharacterOnClick() {
        $('.character').on("click", function() {
            if (!haveCharacter) {
                myChar = $(this).attr('id');
                $("#myguy").append(this);
                $(this).addClass("hero");

                haveCharacter = true;
                $('#whathappens').html("");
                $("#todo").html("Choose your opponent!");
            }
            //Picking your opponent
            else if (!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {
                opponentChar = $(this).attr('id');
                $("#enemy").append(this);
                $(this).addClass("fighting");

                haveAttacker = true;
                $('#whathappens').html("");
                $("#todo").html("Keep clicking attack to fight!");
            }
        });
    }
    //attacking and being attacked
    $('#attack').on("click", function() {
        if (!haveCharacter) {
            $('#whathappens').html("You need to pick your hero first!");
        } else if (!haveAttacker) {
            $('#whathappens').html("Pick who you are fighting!");
        } else if (haveCharacter && haveAttacker) {
            rounds++;
            enemyArray[opponentChar].hitPoints = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;
            enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;


            if (enemyArray[opponentChar].hitPoints < 0) {
                numEnemies--;
                if (numEnemies > 0) {
                    $(".fighting").remove();
                    $('#whathappens').html("");
                    $("#todo").html("Who will you fight next?");
                    haveAttacker = false;
                } else {
                    whatHappens();
                    alert("You win!");
                    wins++;
                    $('#winsloses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
                    varSet();
                }

            } else if (enemyArray[myChar].hitPoints < 0) {
                whatHappens();
                alert("You have been defeated!");
                loses++;
                $('#winsloses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
                varSet();
            } else {
                whatHappens();
                printCharacters();
            }

            enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds; //Get Stronger
        }
    });

    $('#restart').on("click", function() {
        varSet();
    });

    attachCharacterOnClick();
    varSet();

});
