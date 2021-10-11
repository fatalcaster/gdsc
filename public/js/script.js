const cookieName = "postIds";

const like = (x) => {
    x.classList.toggle("dark");
    const postID = getPostID(x);
    const liked = toggleCookie(postID);
    if(liked) {
        x.classList.add("dark");
    } else x.classList.remove("dark");
    changeCounter(x,liked);
}

const changeCounter = (x,increase) => {
    x.textContent = increase ? parseInt(x.textContent) + 1 : parseInt(x.textContent) - 1;
}


const toggleCookie = (postId) => {
    let posts = getCookie(cookieName) || [];
    if(posts && !posts.includes(postId)) {
        let temp = posts;
        temp.push(postId);
        posts = posts ? temp : [postId];
        savePostIDs(posts);
        return true;
    }
    posts = posts.filter(x => x != postId);
    savePostIDs(posts);
    return false;
}

function savePostIDs(data) {
    const expireTime = new Date(new Date().getTime() + 365*24*60*60*1000).toUTCString();
    const cookie = cookieName + '='+JSON.stringify(data)+';expires='+expireTime+';domain='+document.domain+';secure';
    document.cookie = cookie;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length,c.length));
    }
    return null;
}

const getPostID = (button) => {
    return postId = getParent(getParent(button)).id;
}

const getParent = (element) => {
    return element.parentElement;
}

const getDate = () => {
    const p = new Date();
    const day = p.getDate();
    const month = p.getMonth();
    const year = p.getFullYear();
    console.log(day);
    console.log(month);
    return `${day}/${month+1}/${year}`;
}

document.getElementById("date")?.textContent = getDate();

