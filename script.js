const populate = async (value, currency) => {
	const API_KEY = "cur_live_3Izs6FVTBjJVqm40QJ3ghPEEL0xOoGaUUuMCZwO8";
	const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${currency}`;
	let myStr = "";

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Network Response Error");

		const rJson = await response.json();
		document.querySelector(".output").style.display = "block";

		Object.keys(rJson.data).forEach((key) => {
			myStr += `
                <tr>
                    <td>${key}</td>
                    <td>${rJson.data[key].code}</td>
                    <td>${(rJson.data[key].value * value).toFixed(2)}</td>
                </tr>`;
		});

		document.querySelector("tbody").innerHTML = myStr;
	} catch (error) {
		console.error("Failed to fetch currency data: ", error);
		alert("Failed to fetch currency data. Please try again later.");
	}
};

document.querySelector(".btn").addEventListener("click", (e) => {
	e.preventDefault();
	const quantityInput = document.querySelector("input[name='quantity']");
	const value = parseFloat(quantityInput.value);
	const currency = document.querySelector("select[name='currency']").value;

	if (!isNaN(value) && currency) {
		populate(value, currency);
	} else {
		alert("Please enter a valid amount and select a currency.");
	}
});
