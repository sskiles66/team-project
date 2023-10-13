async function getAlerts() {
    const response = await fetch('/json/alert.json');
    const data = await response.json();
    if (data != null){
      const section = document.createElement('section');
      section.classList.add('alert-list');
      data.forEach(element => {
        let el = document.createElement('p');
        el.textContent = element.message;
        el.style.backgroundColor = element.background;
        el.style.color = element.color;
        section.appendChild(el);
      });
      document.querySelector("main").prepend(section);
 }
}

getAlerts();

