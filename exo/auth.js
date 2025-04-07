const generateToken = (user) => {
  return btoa(JSON.stringify(user));
};
const decodeToken = (token) => {
  return JSON.parse(atob(token));
};
const token = generateToken({ firstname: "nathan", lastname: "samochval" });
console.log(token);
console.log(decodeToken(token));

const tabs = [
  "Accueil",
  "Profil",
  "Messages",
  "Paramètres",
  "Aide",
  "Recherche",
  "Favoris",
  "Notes",
  "Tâches",
  "Historique",
];

const filtering = (tabs, critaire) => {
  return tabs.filter((el) => {
    if (el.toLowerCase().trim().includes(critaire)) return el;
  });
};

console.log(filtering(tabs, "a"));
