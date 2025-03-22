document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    // Cancela o envio do formulário
    event.preventDefault();

    const name = encodeURIComponent(document.getElementById("name").value);
    const email = "softwareore@gmail.com";
    const message = encodeURIComponent(
      document.getElementById("message").value
    );

    const mailtoLink = `mailto:${email}?subject=Tenho um projeto que gostaria de discutir&body=Olá, meu nome é ${name}%0A${message}`;

    window.location.href = mailtoLink;
  });
