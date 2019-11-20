function sendRequest(filePath,onLoadFun,...params){
    let xhr = new XMLHttpRequest();

    xhr.open('GET',filePath,true);

    xhr.send();

    xhr.onload = function(){
        if(this.status == 200){
            let jArr = JSON.parse(this.responseText);
            onLoadFun(jArr,params);
        }
    }
}

// data -> json/array from the ajax call
function showContents(data){
    let out = '';
    // el -> every object in the data array
    data.forEach(el => {
        out += getButton(el) + '<br>';
    })

    document.getElementsByClassName('content')[0].innerHTML = out;
}

// dataArr -> json/array from ajax call
// number -> the hymn's number to be shown
function showText(dataArr,number){
    let out = `<div class="hymn-title">${dataArr[number-1]["title"]}</div><div class="hymn">`;
    let obj = dataArr[number-1]["text"];     //get the text field of number-1 object in the data array  
    
    obj.forEach(line => {
        let key = Object.keys(line)[0];     //get the value of the first key of the accessed object ("title" : [{"lyrics": "..."},{"chords" : "..."},{...}])
        out += `<div class='${key}'>${line[key]}</div>`;
    });
    out += "</div>";
    document.getElementsByClassName('content')[0].innerHTML = out;
}

// obj -> an object from json file/array
function getButton(obj){
    return `<button class='hymn-button'
        onclick="sendRequest('./data.json',showText,${obj.number})">${obj.title}</div>`;
}

function toolbarToggle(){
    let el = document.getElementsByClassName('toolbar')[0];
    if(window.getComputedStyle(el).display == 'none')
        el.style.display = 'flex';
    else
        el.style.display = 'none';
        
}

var size = ['150%','170%','190%','200%','120%'];
var sizeInd = 0;

function changeFont(){
    let hymn = document.getElementsByClassName('hymn')[0];
    // let size = window.getComputedStyle(hymn).getPropertyValue('font-size');
    // size = size.split('p')[0];
    // if(sym=='+') size++;
    // else size--;
    // size+='px';
    hymn.style.fontSize = size[(++sizeInd)%5];
    console.log(sizeInd);
}

function initSize(){sizeInd = 0;}

var circle = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

function changeChord(ch,val){
    let point;
    let key;
    let rem;

    if(ch.split('#').length > 1){
        key = ch.slice(0,2);
        rem = ch.slice(2);
    }
    else{
        key = ch[0];
        rem = ch.slice(1);
    }

    
    circle.forEach(function(el,ind){
        if(el == key)
            point = ind;
    });
    return (circle[(point+parseInt(val))%12] + rem);
}

function changeChordLine(line,val){
    let arrCh = line.split(/[\s-]/).filter(el => {
        if( el != '') return el;
    });

    arrCh = arrCh.filter(isUnique);

    let arrChNew = arrCh.map(el => {
        return changeChord(el,val);
    });
    
    arrChNew.forEach((el,ind) => {
        line = line.replace(arrCh[ind],el);
    });

    return line;

}

function changeAllChords(val){
    let chArr = new Array();
    let list = document.getElementsByClassName('chords');
    for(key of list){
        key.innerHTML = changeChordLine(key.innerHTML,val);
    }
}

function isUnique(value, ind, self){
    return (self.indexOf(value) == ind);
}