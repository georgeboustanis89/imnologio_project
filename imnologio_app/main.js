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
        out += `${el.title}<br>`;
    })

    document.getElementsByClassName('content')[0].innerHTML = out;
}