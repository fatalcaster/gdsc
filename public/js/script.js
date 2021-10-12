const cookieName = "postIds";

var HttpClient = function () {
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

window.onload = () => {
  const buttons = Array.prototype.slice.call(
    document.getElementsByClassName("like-btn")
  );
  const cookiePosts = getCookie(cookieName) || [];
  console.log(buttons[0].id);
  if (!cookiePosts.length) return;
  buttons.forEach((button) => {
    if (cookiePosts.includes(getParent(getParent(button)).id))
      button.classList.add("dark");
  });
};

const like = (x) => {
  const postID = getPostID(x);
  const liked = !toggleCookie(postID);
  console.log(liked);
  if (!liked) {
    x.classList.add("dark");
  } else x.classList.remove("dark");
  changeCounter(x, !liked);
  const client = new HttpClient();
  client.get(`/post/${postID}`, function (response) {
    console.log(response);
  });
};

const changeCounter = (x, increase) => {
  x.textContent = increase
    ? parseInt(x.textContent) + 1
    : parseInt(x.textContent) - 1 < 0
    ? 0
    : parseInt(x.textContent) - 1;
};

const toggleCookie = (postId) => {
  let posts = getCookie(cookieName) || [];
  if (posts && !posts.includes(postId)) {
    posts.push(postId);
    savePostIDs(posts);
    return true;
  }
  posts = posts.filter((x) => x != postId);
  savePostIDs(posts);
  return false;
};

function savePostIDs(data) {
  const expireTime = new Date(
    new Date().getTime() + 365 * 24 * 60 * 60 * 1000
  ).toUTCString();
  const cookie =
    cookieName +
    "=" +
    JSON.stringify(data) +
    ";expires=" +
    expireTime +
    ";domain=" +
    document.domain +
    ";secure";
  document.cookie = cookie;
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}

const getPostID = (button) => {
  return (postId = getParent(getParent(button)).id);
};

const getParent = (element) => {
  return element.parentElement;
};

const getDate = () => {
  const p = new Date();
  const day = p.getDate();
  const month = p.getMonth();
  const year = p.getFullYear();
  console.log(day);
  console.log(month);
  return `${day}/${month + 1}/${year}`;
};
const date = document.getElementById("date");
if (date) date.textContent = getDate();
