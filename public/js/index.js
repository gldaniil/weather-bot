const windowParams = document.querySelector(".params__window");

const dataRequest = async (name, value) => {
  await fetch("/", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Allow": "POST",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, value })
  })
  .then(response => console.log(response.text(), response.status))
  .catch(error => console.log(error));
}

const handlerEditor = (e) => {
  const target = e.target;
  if (target.tagName !== "SPAN" && target.tagName !== "INPUT") return;

  const defaultInputStyles = (target) => {
    target.classList.remove("edit");
    target.disabled = true;
  };

  if (target.tagName === "SPAN") {
    const divParent = target.closest("div").nextElementSibling;
    if (divParent.children.length < 3) {
      const input = divParent.querySelector("input");
      input.classList.add("edit");
      input.value = "";
      input.placeholder = "Введите новое значение";
      input.disabled = false;
      const accept = document.createElement("input");
      accept.className = "params__accept";
      accept.type = "submit";
      accept.value = "Сохранить";
      const decline = document.createElement("input");
      decline.className = "params__decline";
      decline.type = "button";
      decline.value = "Отменить";
      input.after(accept, decline);
    }
    // Если сохранить
  } else if (target.type === "submit") {
    const mainInput = target.previousElementSibling;
    console.log(mainInput.value);
    target.nextElementSibling.remove();
    target.remove();
    defaultInputStyles(mainInput);
    dataRequest(mainInput.className, mainInput.value);

    // Если отменить
  } else if (target.type === "button") {
    target.previousElementSibling.remove();
    const mainInput = target.previousElementSibling;
    target.remove();
    mainInput.value = mainInput.defaultValue;
    defaultInputStyles(mainInput);
  }
};

windowParams.addEventListener("click", (e) => handlerEditor(e));
