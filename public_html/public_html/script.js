var somethingthere1 = false;
var somethingthere2 = false;
var somethingthere3 = false;

function ShowAndHide1() {
    var x = document.getElementById('1');
    if ((x.style.display == 'none')) {
        if(somethingthere2){
            ShowAndHide2();
        }
        if(somethingthere3){
            ShowAndHide3();
        }
        x.style.display = 'block';
        somethingthere1 = true;

    } 
    else{
        x.style.display = "none";
        somethingthere1 = false;
    }
}

function ShowAndHide2() {
    var x = document.getElementById('2');
    if ((x.style.display == 'none')) {
        if(somethingthere1){
            ShowAndHide1();
        }
        if(somethingthere3){
            ShowAndHide3();
        }
        x.style.display = 'block';
        somethingthere2 = true;
    } 
    else{
        x.style.display = "none";
        somethingthere2 = false;
    }
}

function ShowAndHide3() {
    var x = document.getElementById('3');
    if ((x.style.display == 'none') ) {
        if(somethingthere1){
            ShowAndHide1();
        }
        if(somethingthere2){
            ShowAndHide2();
        }
        x.style.display = 'block';
        somethingthere3 = true;

    } 
    else{
        x.style.display = "none";
        somethingthere3 = false;
    }
}



