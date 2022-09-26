const body = document.querySelector("body");
const form = document.querySelector("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const user = "username";
const pass = "password";
let valid;

const getPixles = (percentage) => {
  return (window.innerHeight / 100) * percentage;
};

form.style.minHeight = `${getPixles(75)}px`;

const outline = (input) => {
  input.style.boxShadow = "0 0 1em .25em green";
  valid = true;
};

const outlineBad = (input) => {
  input.style.boxShadow = "0 0 1em .25em red";
  valid = false;
};

const validatePass = (e) => {
  const regex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;
  const value = password.value;
  if (value === "") return (password.style.boxShadow = "0 0 1em .1em purple");
  const isValid = value.match(regex);
  !isValid ? outlineBad(e.target) : outline(e.target);
};

const validateUser = (e) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const value = username.value;
  if (value === "") return (username.style.boxShadow = "0 0 1em .1em purple");
  const isValid = value.match(regex);
  !isValid ? outlineBad(e.target) : outline(e.target);
};

const validate = (e) => {
  e.preventDefault();
  if (e.target.id === user) validateUser(e);
  if (e.target.id === pass) validatePass(e);
};

const toggle = () => {
  const alert = document.querySelector(".alert");
  const backDrop = document.querySelector(".back-drop");
  alert.classList.toggle("show");
  backDrop.classList.toggle("show");
};

const createAlert = () => {
  toggle();
  form.reset();
  setTimeout(() => {
    toggle();
  }, 2000);
};

const check = (youAreIn) => {
  if (valid) body.appendChild(youAreIn);
  else createAlert();
};

const buildElement = (e) => {
  e.preventDefault();
  const youAreIn = document.createElement("div");
  const conformation = document.createElement("h1");
  conformation.innerHTML = `You are logged in!`;
  youAreIn.className = "you-are-in flex-reg width";
  youAreIn.appendChild(conformation);
  check(youAreIn);
};

username.addEventListener("keyup", validate);
password.addEventListener("keyup", validate);
form.addEventListener("submit", buildElement);
