const baseUrl = `http://localhost:8000`;

window.onload = async function() {
    try {
        let params = await (await fetch(`${baseUrl}/getParam`)).json();
        console.log(params);

        for (let is in params) {
            let a = Object.values(params[is]);
            let loginoption = document.createElement("option");
            let signUpoption = document.createElement("option");
            loginoption.value = a[0];
            loginoption.text = a[1];

            signUpoption.value = a[0];
            signUpoption.text = a[1];

            // document.document.getElementsByName("role").add(option);
            document.getElementById("loginselect").add(loginoption);
            document.getElementById("signUpselect").add(signUpoption);
            console.log(a);
        }
    } catch (e) {
        console.log(e);
    }
};