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

function showContents(data){
    let out = '';

    data.forEach(el => {
        out += getButton(el) + '<br>';
    })

    document.getElementsByClassName('content')[0].innerHTML = out;
}

function showText(data,number){
    let out = '';
    let element = data[number-1]["text"];     //get the text field of number-1 object in the data array  
    
    element.forEach(line => {
        let key = Object.keys(line)[0];
        out += `<div class='${key}'>${line[key]}</div>`;
    });
    document.getElementsByClassName('content')[0].innerHTML = out;
}

function getButton(element){
    return `<button class='hymn-button'>${element.title}</div>`;
}