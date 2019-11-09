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
    let out = '';
    let obj = dataArr[number-1]["text"];     //get the text field of number-1 object in the data array  
    
    obj.forEach(line => {
        let key = Object.keys(line)[0];     //get the value of the first key of the accessed object ("title" : [{"lyrics": "..."},{"chords" : "..."},{...}])
        out += `<div class='${key}'>${line[key]}</div>`;
    });
    document.getElementsByClassName('content')[0].innerHTML = out;
}

// obj -> an object from json file/array
function getButton(obj){
    return `<button class='hymn-button'
        onclick="sendRequest('./data.json',showText,${obj.number})">${obj.title}</div>`;
}