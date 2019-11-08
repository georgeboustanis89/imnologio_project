function makeContentObj(){
    // take contents from textarea id='hymn-content' as an array (with split)
    let content = document.getElementById('hymn-content').value.split('\n');

    // json's elements
    let title = "";
    let text = "";
    let number = "";

    // for every line - array's element determine if it is chord/lyric/space/title line
    content.forEach(el => {
        if(el.match(/^>/)){
            title = `<div class='title'>${el.slice(1)}</div>`;
            number = el.slice(1).split('.')[0];
        }
        else if(el == '')
            text += `"<div class='space'>&nbsp;</div>",\n\t\t`;
        else if(el.match(/^@.*/))
            text += `"<div class='chords'>${el.replace('@',' ')}</div>",\n\t\t`;
        else
            text += `"<div class='lyrics'>${el}</div>",\n\t\t`;
    });

    // delete 4 last characters (last comma needs to be deleted) and 'close' the array and the whole object
    text = text.slice(0,-4) + '\n\t\t]\n}';
    let out;

    // form the final output for the text area id='obj-content' as string
    out = `{\n\t"number" : "${number}",\n\t"title" : "${title}",\n\t"text" : [\n\t\t${text}`;

    document.getElementById('obj-content').innerHTML = out;

}