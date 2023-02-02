const baseUrl = `http://localhost:8000`;

window.onload = async function() {
    try {
        let params = await (await fetch(`${baseUrl}/getParam`)).json();
        console.log(params);

        for (let is in params) {
            let a = Object.values(params[is]);

            let signUpoption = document.createElement("option");

            signUpoption.value = a[0];
            signUpoption.text = a[1];

            // document.document.getElementsByName("role").add(option);

            document.getElementById("signUpselect").add(signUpoption);
            console.log(a);
        }
    } catch (e) {
        console.log(e);
    }
};