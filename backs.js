document.addEventListener('DOMContentLoaded', () => {const data = {"div": { "class": "button-group", "content": [{ "button": { "id": "backButton", "text": "MANsitee", "href": "https://mansitee.github.io/", "target": "_self" } },{"div": {"class": "dropdown",
"content": [{ "button": { "class": "dropbtn", "text": "Links" } },{"div": {                                   "class": "dc","content": [                                    { "a": { "href": "https://github.com/mansitee", "target": "_blank", "text": "Mansitee" } },                              { "a": { "href": "https://mansitee.github.io/p/", "target": "_blank", "text": "Pages" } },                                       { "a": { "href": "https://m.youtube.com/watch?v=0iGMY2FZMpc", "target": "_blank", "text": "YouTube" } },                                      { "a": { "href": "https://mansitee.github.io", "target": "_blank", "text": "About" } } ] } } ] } } ] } };
    const style = document.createElement('style');
    style.innerHTML = `
        body{font-family:Arial,sans-serif;margin:0;padding:0;-webkit-overflow-scrolling:touch;-webkit-tap-highlight-color:transparent}#content{padding:20px}.button-group{position:fixed;top:10px;left:10px;display:flex;gap:1px;z-index: 99999;}#backButton{padding:5px 5px;background-color:#fff;color:#333;font-size:1em;font-weight:bold;border:none;border-radius:10px 0 0 10px;cursor:pointer}#backButton:hover{background-color:#fff;border-radius:10px 0 0 10px}.dropbtn{padding:5px 5px;background-color:#fff;color:#333;font-size:1em;font-weight:bold;border:none;border-radius:0 10px 10px 0;cursor:pointer;}.dropbtn:hover{background-color:#007bff;color:#fff;border-radius:0 10px 10px 0;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)}.dropdown{position:relative;display:inline-block}.dc{margin-top:5px;left:-45px;display:none;position:absolute;background-color:#f9f9f9;min-width:140px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);z-index:1;border-radius:10px;animation: slideIn 0.5s;}.dc a{font-family:Arial,sans-serif;color:black;font-size:1em;font-weight:normal;padding:2px 6px; margin-left:20px;text-decoration:none;display:block; position:relative;} 
.dc a::before {content:"#";position:absolute;left:-10px;color:#007bff;font-size:1em;font-weight:bold;} 
.dc a:hover{background-color:#f1f1f1;}.dropdown:hover .dc{display:block;} @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
} `;
    document.head.appendChild(style);

    const buttonGroup = createButtonGroup(data.div); document.body.appendChild(buttonGroup); });
const createButtonGroup = (data) => {const div = document.createElement('div');
    div.className = data.class;
    data.content.forEach(item => {
        if (item.button) {
            const button = document.createElement('button');
            button.id = item.button.id;
            button.textContent = item.button.text;
            if (item.button.href) {
                button.onclick = () => { window.location.href = item.button.href };
            }
            div.appendChild(button);
        } else if (item.div) {
            const dropdown = createDropdown(item.div);
            div.appendChild(dropdown);
        }
    });
    return div;
};

const createDropdown = (data) => {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = data.class;
    data.content.forEach(item => {
        if (item.button) {
            const button = document.createElement('button');
            button.className = item.button.class;
            button.textContent = item.button.text;
            dropdownDiv.appendChild(button);
        } else if (item.div) {
            const dropdownContent = createDropdownContent(item.div);
            dropdownDiv.appendChild(dropdownContent);
        }
    });
    return dropdownDiv;
};

const createDropdownContent = (data) => {
    const dropdownContentDiv = document.createElement('div');
    dropdownContentDiv.className = data.class;
    data.content.forEach(item => {
        const link = document.createElement('a');
        link.href = item.a.href;
        link.target = item.a.target;
        link.textContent = item.a.text;
        dropdownContentDiv.appendChild(link);
    });
    return dropdownContentDiv;
};
